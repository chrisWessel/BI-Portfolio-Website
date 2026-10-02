/*
    Airline review analytics
    SQL Server / T-SQL

    The public schema excludes reviewer names and free-text review content.
    Load only the rating and categorical columns needed for analysis into
    stg.AirlineReviewRaw. No source records are included in this portfolio.
*/

IF SCHEMA_ID(N'stg') IS NULL
    EXEC(N'CREATE SCHEMA stg');
GO

IF SCHEMA_ID(N'mart') IS NULL
    EXEC(N'CREATE SCHEMA mart');
GO

IF OBJECT_ID(N'stg.AirlineReviewRaw', N'U') IS NULL
BEGIN
    CREATE TABLE stg.AirlineReviewRaw
    (
        ReviewDate nvarchar(50) NULL,
        Airline nvarchar(200) NULL,
        Verified nvarchar(20) NULL,
        CustomerSegment nvarchar(100) NULL,
        MonthFlown nvarchar(50) NULL,
        Route nvarchar(200) NULL,
        TravelClass nvarchar(100) NULL,
        SeatComfort nvarchar(20) NULL,
        StaffService nvarchar(20) NULL,
        FoodAndBeverages nvarchar(20) NULL,
        InflightEntertainment nvarchar(20) NULL,
        ValueForMoney nvarchar(20) NULL,
        OverallRating nvarchar(20) NULL,
        Recommended nvarchar(20) NULL
    );
END;
GO

CREATE OR ALTER VIEW mart.vw_AirlineReview
AS
SELECT
    TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(ReviewDate)), N''), 101) AS ReviewDate,
    NULLIF(LTRIM(RTRIM(Airline)), N'') AS Airline,
    CASE
        WHEN LOWER(LTRIM(RTRIM(Verified))) IN (N'true', N'yes', N'1') THEN CONVERT(bit, 1)
        WHEN LOWER(LTRIM(RTRIM(Verified))) IN (N'false', N'no', N'0') THEN CONVERT(bit, 0)
        ELSE NULL
    END AS IsVerified,
    NULLIF(LTRIM(RTRIM(CustomerSegment)), N'') AS CustomerSegment,
    NULLIF(LTRIM(RTRIM(MonthFlown)), N'') AS MonthFlown,
    NULLIF(LTRIM(RTRIM(Route)), N'') AS Route,
    NULLIF(LTRIM(RTRIM(TravelClass)), N'') AS TravelClass,
    TRY_CONVERT(tinyint, NULLIF(LTRIM(RTRIM(SeatComfort)), N'')) AS SeatComfort,
    TRY_CONVERT(tinyint, NULLIF(LTRIM(RTRIM(StaffService)), N'')) AS StaffService,
    TRY_CONVERT(tinyint, NULLIF(LTRIM(RTRIM(FoodAndBeverages)), N'')) AS FoodAndBeverages,
    TRY_CONVERT(tinyint, NULLIF(LTRIM(RTRIM(InflightEntertainment)), N'')) AS InflightEntertainment,
    TRY_CONVERT(tinyint, NULLIF(LTRIM(RTRIM(ValueForMoney)), N'')) AS ValueForMoney,
    TRY_CONVERT(decimal(5, 2), NULLIF(LTRIM(RTRIM(OverallRating)), N'')) AS OverallRating,
    CASE
        WHEN LOWER(LTRIM(RTRIM(Recommended))) IN (N'yes', N'true', N'1') THEN CONVERT(bit, 1)
        WHEN LOWER(LTRIM(RTRIM(Recommended))) IN (N'no', N'false', N'0') THEN CONVERT(bit, 0)
        ELSE NULL
    END AS IsRecommended
FROM stg.AirlineReviewRaw;
GO

-- Compare overall and service-attribute ratings by airline.
SELECT
    Airline,
    COUNT_BIG(*) AS ReviewCount,
    AVG(OverallRating) AS AverageOverallRating,
    AVG(CONVERT(decimal(5, 2), SeatComfort)) AS AverageSeatComfort,
    AVG(CONVERT(decimal(5, 2), StaffService)) AS AverageStaffService,
    AVG(CONVERT(decimal(5, 2), FoodAndBeverages)) AS AverageFoodAndBeverages,
    AVG(CONVERT(decimal(5, 2), ValueForMoney)) AS AverageValueForMoney
FROM mart.vw_AirlineReview
WHERE Airline IS NOT NULL
GROUP BY Airline
ORDER BY AverageOverallRating DESC;

-- Recommendation share by airline and travel class.
SELECT
    Airline,
    TravelClass,
    COUNT_BIG(*) AS ReviewCount,
    AVG(CONVERT(decimal(5, 2), IsRecommended)) AS RecommendationShare
FROM mart.vw_AirlineReview
WHERE Airline IS NOT NULL
GROUP BY Airline, TravelClass
ORDER BY Airline, RecommendationShare DESC;

-- Rating trend by month.
SELECT
    DATEFROMPARTS(YEAR(ReviewDate), MONTH(ReviewDate), 1) AS ReviewMonth,
    COUNT_BIG(*) AS ReviewCount,
    AVG(OverallRating) AS AverageOverallRating
FROM mart.vw_AirlineReview
WHERE ReviewDate IS NOT NULL
GROUP BY DATEFROMPARTS(YEAR(ReviewDate), MONTH(ReviewDate), 1)
ORDER BY ReviewMonth;
