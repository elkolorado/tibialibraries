import os

# Specify the directory where the images are located
image_directory = "carvings-satellite"

# Get all the file names in the directory
file_names = os.listdir(image_directory)

# Create an array of image paths
image_paths = [os.path.join(image_directory, file_name) for file_name in file_names]

# save array of image paths to a json
import json
with open('carvings_satellite_paths.json', 'w') as f:
    json.dump(image_paths, f)