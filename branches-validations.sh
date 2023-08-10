#!/bin/bash

# Get the current branch name
current_branch=$(git symbolic-ref --short HEAD)

# Define the valid prefixes
valid_prefixes=("feature" "bugfix" "release" "hotfix")

# Check if the branch name starts with a valid prefix
valid=false
for prefix in "${valid_prefixes[@]}"; do
  if [[ "$current_branch" == "$prefix"* ]]; then
    valid=true
    break
  fi
done

# If the branch name is valid, exit with success code (0), else exit with failure code (1)
if [ "$valid" = true ]; then
  exit 0
else
  echo "Invalid branch name. Branches must start with one of: feature, bugfix, release, hotfix"
  exit 1
fi
