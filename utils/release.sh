#!/usr/bin/env bash
if [ "$1" != "major" ] && [ "$1" != "minor" ] && [ "$1" != "patch" ];
then
    echo "Could not release!"
    echo "Usage: 'npm run release -- (major|minor|patch)'"
    echo ""
    exit 1
fi

NEW_VERSION=$(npm version $1)
TAG_NAME="$NEW_VERSION"

echo 'Building before bump...'
npm run build

git add .
git commit -m $TAG_NAME
git tag $TAG_NAME
echo "Bumped version to $TAG_NAME"
echo ""

git push && git push --tags
