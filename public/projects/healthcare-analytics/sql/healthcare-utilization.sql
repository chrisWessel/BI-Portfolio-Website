/*
    Healthcare utilization analytics
    SQL Server / T-SQL

    The analytical staging table intentionally omits patient names, doctor
    names, hospital names, room numbers, and free-text fields. Load only an
    approved, de-identified extract into stg.HealthcareEncounter.
*/

IF SCHEMA_ID(N'stg') IS NULL
    EXEC(N'CREATE SCHEMA stg');
GO

IF SCHEMA_ID(N'mart') IS NULL
    EXEC(N'CREATE SCHEMA mart');
GO

IF OBJECT_ID(N'stg.HealthcareEncounter', N'U') IS NULL
BEGIN
    CREATE TABLE stg.HealthcareEncounter
    (
        Age nvarchar(20) NULL,
        Gender nvarchar(40) NULL,
        BloodType nvarchar(20) NULL,
        MedicalCondition nvarchar(100) NULL,
        AdmissionDate nvarchar(50) NULL,
        InsuranceProvider nvarchar(100) NULL,
        BillingAmount nvarchar(50) NULL,
        AdmissionType nvarchar(50) NULL,
        DischargeDate nvarchar(50) NULL,
        Medication nvarchar(100) NULL,
        TestResults nvarchar(100) NULL
    );
END;
GO

CREATE OR ALTER VIEW mart.vw_HealthcareEncounter
AS
SELECT
    TRY_CONVERT(tinyint, NULLIF(LTRIM(RTRIM(Age)), N'')) AS Age,
    NULLIF(LTRIM(RTRIM(Gender)), N'') AS Gender,
    NULLIF(LTRIM(RTRIM(BloodType)), N'') AS BloodType,
    NULLIF(LTRIM(RTRIM(MedicalCondition)), N'') AS MedicalCondition,
    TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(AdmissionDate)), N''), 101) AS AdmissionDate,
    NULLIF(LTRIM(RTRIM(InsuranceProvider)), N'') AS InsuranceProvider,
    TRY_CONVERT(decimal(14, 2), NULLIF(
        REPLACE(REPLACE(LTRIM(RTRIM(BillingAmount)), N'$', N''), N',', N''),
        N''
    )) AS BillingAmount,
    NULLIF(LTRIM(RTRIM(AdmissionType)), N'') AS AdmissionType,
    TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(DischargeDate)), N''), 101) AS DischargeDate,
    NULLIF(LTRIM(RTRIM(Medication)), N'') AS Medication,
    NULLIF(LTRIM(RTRIM(TestResults)), N'') AS TestResults
FROM stg.HealthcareEncounter;
GO

-- Utilization and billing by condition.
SELECT
    MedicalCondition,
    COUNT_BIG(*) AS EncounterCount,
    AVG(BillingAmount) AS AverageBillingAmount,
    SUM(BillingAmount) AS TotalBillingAmount,
    AVG(CONVERT(decimal(10, 2), DATEDIFF(day, AdmissionDate, DischargeDate))) AS AverageLengthOfStayDays
FROM mart.vw_HealthcareEncounter
WHERE MedicalCondition IS NOT NULL
GROUP BY MedicalCondition
ORDER BY EncounterCount DESC;

-- Monthly admissions and average billed amount.
SELECT
    DATEFROMPARTS(YEAR(AdmissionDate), MONTH(AdmissionDate), 1) AS AdmissionMonth,
    COUNT_BIG(*) AS EncounterCount,
    AVG(BillingAmount) AS AverageBillingAmount
FROM mart.vw_HealthcareEncounter
WHERE AdmissionDate IS NOT NULL
GROUP BY DATEFROMPARTS(YEAR(AdmissionDate), MONTH(AdmissionDate), 1)
ORDER BY AdmissionMonth;

-- Test-result mix by admission type.
SELECT
    AdmissionType,
    TestResults,
    COUNT_BIG(*) AS EncounterCount
FROM mart.vw_HealthcareEncounter
GROUP BY AdmissionType, TestResults
ORDER BY AdmissionType, EncounterCount DESC;
