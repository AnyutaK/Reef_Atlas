import geopandas as gpd

path = "/Users/anyutakumar/Downloads/14_001_WCMC008_CoralReefs2018_v4_1/01_Data/WCMC008_CoralReef2018_Pt_v4_1.shp"

gdf = gpd.read_file(path)

print(gdf.columns)
print()
print(gdf.head())
print()
print("Rows:", len(gdf))