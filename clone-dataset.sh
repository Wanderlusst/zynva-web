#!/bin/bash

# Script to import Sanity export tar file to develop dataset
# Project ID: jni56u7c

PROJECT_ID="jni56u7c"
TARGET_DATASET="develop"
EXPORT_FILE="sanity-export-production-2025-11-10T12-34-44-057Z.tar.gz"

# Check if export file exists
if [ ! -f "$EXPORT_FILE" ]; then
  echo "❌ Error: Export file '$EXPORT_FILE' not found!"
  echo "Available export files:"
  ls -la sanity-export*.tar.gz 2>/dev/null || echo "No export files found"
  exit 1
fi

echo "Found export file: $EXPORT_FILE"

# Delete existing dataset if it exists (ignore errors if it doesn't exist)
echo "Removing existing $TARGET_DATASET dataset if it exists..."
npx sanity@latest dataset delete $TARGET_DATASET --project $PROJECT_ID --force 2>/dev/null || true
echo "Proceeding with dataset creation..."

# Create the dataset
echo "Creating $TARGET_DATASET dataset..."
npx sanity@latest dataset create $TARGET_DATASET --project $PROJECT_ID

if [ $? -eq 0 ]; then
  echo "Dataset created successfully!"
  echo "Importing data from $EXPORT_FILE to $TARGET_DATASET dataset..."
  echo "Note: Export is from project 'as6uu48r', importing to project '$PROJECT_ID'"
  echo "Using --allow-assets-in-different-dataset flag to allow cross-project assets..."
  npx sanity@latest dataset import $EXPORT_FILE $TARGET_DATASET --project $PROJECT_ID --allow-assets-in-different-dataset --replace
  if [ $? -eq 0 ]; then
    echo "✅ Import completed successfully!"
    echo "⚠️  Note: Assets may still reference the original project (as6uu48r)."
    echo "   You may need to re-upload assets or update asset references."
  else
    echo "❌ Error importing dataset."
    exit 1
  fi
else
  echo "❌ Error creating dataset."
  exit 1
fi

