var dropContainer = document.getElementById("dropContainer");
var fileInput = document.getElementById("fileInput");
var selectedFileContainer = document.getElementById("selectedFileContainer");
var submitBtn = document.getElementById("submitBtn");
var selectedFile = null;

dropContainer.addEventListener("dragenter", handleDragEnter);
dropContainer.addEventListener("dragover", handleDragOver);
dropContainer.addEventListener("dragleave", handleDragLeave);
dropContainer.addEventListener("drop", handleDrop);
fileInput.addEventListener("change", handleFileSelect);
submitBtn.addEventListener("click", handleSubmit);

function handleDragEnter(event) {
  event.preventDefault();
  dropContainer.classList.add("dragging");
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragLeave(event) {
  dropContainer.classList.remove("dragging");
}

function handleDrop(event) {
  event.preventDefault();
  dropContainer.classList.remove("dragging");
  var files = event.dataTransfer.files;
  handleFiles(files);
}

function handleFileSelect(event) {
  var files = event.target.files;
  handleFiles(files);
}

function handleFiles(files) {
  if (files.length > 0) {
    selectedFile = files[0];
    selectedFileContainer.textContent = "File: " + selectedFile.name;
  }
}

function handleSubmit() {
  if (selectedFile) {
    var formData = new FormData();
    formData.append("uid", "26");
    formData.append("file", selectedFile);

    fetch("https://dev.masmedi.com/masmedi_dev/admin1/apiv1.0/postlab-test-prescription.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error uploading file");
        }
      })
      .then((data) => {
        alert("File submitted successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while uploading the file");
      });
  } else {
    alert("Please select a file");
  }
}
