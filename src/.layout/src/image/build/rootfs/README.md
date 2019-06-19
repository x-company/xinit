# Place here your Files which should deployed to your Docker Image

## For Example

You want deploy a File in your Docker Image to Location `/etc/myfolder/myfile.txt`. So you have to create
a Folder under *rootfs* `etc/myfolder` and place your File `myfile.txt` in it. The Install Process will
copy this File to your Docker Image to the given Location.

Remarks! Don't forget to set the right Permission in your Service Install File.
