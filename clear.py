import os

bannersPath = "assets/images/banners/"

bannerList = os.listdir(bannersPath)


if(len(bannerList) == 0):
    print("📁 No files found to clean")
else:
    for files in bannerList:
        os.remove(bannersPath+files)

    print("🔥 Files Cleared Successfully 🔥")