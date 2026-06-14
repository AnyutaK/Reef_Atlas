import geopandas as gpd
import sqlite3

gdf = gpd.read_file(
    "/Users/anyutakumar/Downloads/14_001_WCMC008_CoralReefs2018_v4_1/01_Data/WCMC008_CoralReef2018_Py_v4_1.shp"
)
named = gdf[
    gdf["NAME"].notna() &
    (gdf["NAME"].str.strip() != "") &
    (gdf["NAME"] != "Not Reported") &
    (gdf["NAME"].astype(str).str.strip() != "0")
].copy()
named_projected = named.to_crs(epsg=3857)
centroids = named_projected.geometry.centroid.to_crs(epsg=4326)
named["Latitude"] = centroids.y
named["Longitude"] = centroids.x
reef_df = named[
    [
        "NAME",
        "Latitude",
        "Longitude",
        "GIS_AREA_K",
        "VERIF",
        "SURVEY_MET"
    ]
].copy()

reef_df.columns = [
    "ReefName",
    "Latitude",
    "Longitude",
    "AreaSqKm",
    "VerificationStatus",
    "SurveyMethod"
]

conn = sqlite3.connect("coral_reef.db")
reef_df.insert(0, "ReefID", range(1, len(reef_df) + 1))
reef_df.to_sql(
    "Reef",
    conn,
    if_exists="replace",
    index=False
)

print(f"Imported {len(reef_df)} reefs!")
