var summation = 0; //Current amount of frames past (should meet rotation speed before the selected image is brought into view)
var i = 1; //The next image to load value
var fading = false;
var imageToLoad = ""; //Stores the image that must be loaded next. should be null when image loaded
var unfade = false; //Checks if the mode is set to make the image fade in rather than fade out

function _ImageHandle() //handles the rotation and fading of images
{
	summation += speed;
	if(summation >= rotationSpeed && fading == false) //If its time to rotate to the next image and the current image has loaded
	{
		if(i < loadedImages.length)
		{
			imageToLoad ="Slideshow/"+loadedImages[i].ref;
			descElement.innerHTML = loadedImages[i].desc;
			i++; //Increment next image counter
			fading = true;
			summation = 0; //reset sum
		}
		else
		{
			i = 0;
		}
	}
	else if(fading == true) //While the image is fading in and out
	{
		if(unfade == false) //If image has not yet changed
		{
			slideshowElement.style.opacity = slideshowElement.style.opacity - 0.025;
			
			if(slideshowElement.style.opacity <= 0.1)
			{
				slideshowElement.style.opacity = 0.1;
				slideshowElement.src = imageToLoad;
				unfade = true;
			}
		}
		else //When loading in the image
		{
			slideshowElement.style.opacity = parseFloat(slideshowElement.style.opacity) + 0.025;
			
			if(slideshowElement.style.opacity >= 1)
			{
				slideshowElement.style.opacity = 1;
				fading = false;
				unfade = false;
				imageToLoad = ""; //Reset image to load
			}
		}
	}
};

function _PrevImage()
{
	if(!fading)
	{
		i -= 2;
		if(i < 0)
		{
			i = loadedImages.length - 1;
		}
		summation = rotationSpeed;
		fading = true;
	}
}

function _NextImage()
{
	if(!fading)
	{
		summation = rotationSpeed;
		fading = true;
	}
}