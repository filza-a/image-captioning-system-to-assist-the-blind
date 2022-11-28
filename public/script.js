//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
da = document.querySelector(".drag-area").innerHTML
let file; //this is a global variable and we'll use it inside multiple functions
removeImageButton = document.getElementById('rmv-img-btn')

function browseBtnCLicked(){ input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
function dragOver(event){
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
}

//If user leave dragged File from DropArea
function dragLeave(){
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
}


//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    }
    fileReader.readAsDataURL(file);
    //show generated caption, once the image is uploaded and shown
    document.getElementById('caption').append('Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime esse asperiores tempora dicta commodi, nesciun')
    //show a button to remove the image 
    removeImageButton.style.display = "block";

  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

function rmvButtonClicked(){
  dropArea.innerHTML = da;
  document.getElementById('caption').innerText = '';
  removeImageButton.style.display = "none";

}