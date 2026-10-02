/*
    Hospital operations analytics
    SQL Server / T-SQL

    Load the Hospital Management visits CSV into stg.HospitalVisitsRaw using
    your approved local data workflow before querying the view below.
    No source records are included in this portfolio.
*/

IF SCHEMA_ID(N'stg') IS NULL
    EXEC(N'CREATE SCHEMA stg');
GO

IF SCHEMA_ID(N'mart') IS NULL
    EXEC(N'CREATE SCHEMA mart');
GO

IF OBJECT_ID(N'stg.HospitalVisitsRaw', N'U') IS NULL
BEGIN
    CREATE TABLE stg.HospitalVisitsRaw
    (
        VisitDate nvarchar(50) NULL,
        PatientId nvarchar(50) NULL,
        ProviderId nvarchar(50) NULL,
        DepartmentId nvarchar(50) NULL,
        DiagnosisId nvarchar(50) NULL,
        ProcedureId nvarchar(50) NULL,
        InsuranceId nvarchar(50) NULL,
        ServiceType nvarchar(100) NULL,
        TreatmentCost nvarchar(50) NULL,
        MedicationCost nvarchar(50) NULL,
        FollowUpVisitDate nvarchar(50) NULL,
        PatientSatisfactionScore nvarchar(50) NULL,
        ReferralSource nvarchar(100) NULL,
        EmergencyVisit nvarchar(20) NULL,
        PaymentStatus nvarchar(50) NULL,
        DischargeDate nvarchar(50) NULL,
        AdmittedDate nvarchar(50) NULL,
        RoomType nvarchar(100) NULL,
        InsuranceCoverage nvarchar(50) NULL,
        RoomChargesDailyRate nvarchar(50) NULL
    );
END;
GO

CREATE OR ALTER VIEW mart.vw_HospitalVisits
AS
SELECT
    TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(VisitDate)), N''), 101) AS VisitDate,
    TRY_CONVERT(int, NULLIF(LTRIM(RTRIM(PatientId)), N'')) AS PatientId,
    TRY_CONVERT(int, NULLIF(LTRIM(RTRIM(ProviderId)), N'')) AS ProviderId,
    TRY_CONVERT(int, NULLIF(LTRIM(RTRIM(DepartmentId)), N'')) AS DepartmentId,
    TRY_CONVERT(int, NULLIF(LTRIM(RTRIM(DiagnosisId)), N'')) AS DiagnosisId,
    TRY_CONVERT(int, NULLIF(LTRIM(RTRIM(ProcedureId)), N'')) AS ProcedureId,
    TRY_CONVERT(int, NULLIF(LTRIM(RTRIM(InsuranceId)), N'')) AS InsuranceId,
    NULLIF(LTRIM(RTRIM(ServiceType)), N'') AS ServiceType,
    TRY_CONVERT(decimal(12, 2), NULLIF(
        REPLACE(REPLACE(REPLACE(LTRIM(RTRIM(TreatmentCost)), N'$', N''), N',', N''), N'-', N''),
        N''
    )) AS TreatmentCost,
    TRY_CONVERT(decimal(12, 2), NULLIF(
        REPLACE(REPLACE(REPLACE(LTRIM(RTRIM(MedicationCost)), N'$', N''), N',', N''), N'-', N''),
        N''
    )) AS MedicationCost,
    TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(FollowUpVisitDate)), N''), 101) AS FollowUpVisitDate,
    TRY_CONVERT(tinyint, NULLIF(LTRIM(RTRIM(PatientSatisfactionScore)), N'')) AS PatientSatisfactionScore,
    NULLIF(LTRIM(RTRIM(ReferralSource)), N'') AS ReferralSource,
    CASE
        WHEN LOWER(LTRIM(RTRIM(EmergencyVisit))) IN (N'yes', N'true', N'1') THEN CONVERT(bit, 1)
        WHEN LOWER(LTRIM(RTRIM(EmergencyVisit))) IN (N'no', N'false', N'0') THEN CONVERT(bit, 0)
        ELSE NULL
    END AS IsEmergencyVisit,
    NULLIF(LTRIM(RTRIM(PaymentStatus)), N'') AS PaymentStatus,
    TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(DischargeDate)), N''), 101) AS DischargeDate,
    TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(AdmittedDate)), N''), 101) AS AdmittedDate,
    NULLIF(LTRIM(RTRIM(RoomType)), N'') AS RoomType,
    TRY_CONVERT(decimal(12, 2), NULLIF(
        REPLACE(REPLACE(REPLACE(LTRIM(RTRIM(InsuranceCoverage)), N'$', N''), N',', N''), N'-', N''),
        N''
    )) AS InsuranceCoverage,
    TRY_CONVERT(decimal(12, 2), NULLIF(
        REPLACE(REPLACE(REPLACE(LTRIM(RTRIM(RoomChargesDailyRate)), N'$', N''), N',', N''), N'-', N''),
        N''
    )) AS RoomChargesDailyRate
FROM stg.HospitalVisitsRaw;
GO

-- Visit volume, service mix, and average billed clinical costs.
SELECT
    ServiceType,
    COUNT_BIG(*) AS VisitCount,
    SUM(COALESCE(TreatmentCost, 0) + COALESCE(MedicationCost, 0)) AS ClinicalCost,
    AVG(TreatmentCost) AS AverageTreatmentCost,
    AVG(CONVERT(decimal(12, 2), PatientSatisfactionScore)) AS AverageSatisfaction
FROM mart.vw_HospitalVisits
GROUP BY ServiceType
ORDER BY VisitCount DESC;

-- Month-over-month operational trend.
SELECT
    DATEFROMPARTS(YEAR(VisitDate), MONTH(VisitDate), 1) AS VisitMonth,
    COUNT_BIG(*) AS VisitCount,
    SUM(COALESCE(TreatmentCost, 0) + COALESCE(MedicationCost, 0)) AS ClinicalCost,
    SUM(COALESCE(InsuranceCoverage, 0)) AS InsuranceCoverage
FROM mart.vw_HospitalVisits
WHERE VisitDate IS NOT NULL
GROUP BY DATEFROMPARTS(YEAR(VisitDate), MONTH(VisitDate), 1)
ORDER BY VisitMonth;
