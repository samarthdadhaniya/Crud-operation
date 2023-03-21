// Validation for Input
function validateForm() {
    // Get references to the form elements
    var nameInput = document.getElementById("name");
    var priceInput = document.getElementById("price");
    var descriptionInput = document.getElementById("description");
    var image = document.getElementById("inputGroupFile01");
  
    // Get the values from the input fields
    var name = nameInput.value.trim();
    var price = priceInput.value.trim();
  
    // Validate name input
    if (name === "") {
  
      document.getElementById("name-error-msg").innerHTML = " Please enter your name";
      // alert("Please enter your name");
      return false;
    }else{
      document.getElementById("name-error-msg").innerHTML = "";
    }
  
    // Validate price input
    if (price === "") {
      document.getElementById("price-error-msg").innerHTML = " Please enter the price";
      // alert("Please enter the price");
      return false;
    }else
    {
      document.getElementById("price-error-msg").innerHTML = "";
    }
  
    if (isNaN(price) || price.startsWith("0")) {
      document.getElementById("price-error-msg").innerHTML = " Please enter a valid price number that does not start with zero";
      // alert("Please enter a valid price number that does not start with zero");
      return false;
    }
    else
    {
      document.getElementById("price-error-msg").innerHTML = "";
    }
  
   
    if (descriptionInput.value.length > 50) {
      document.getElementById("disc-error-msg").innerHTML = " Description can be maximum 50 characters";
      // alert("Description can be maximum 50 characters");
      return false;
    } else if(descriptionInput.value == "" ){
      document.getElementById("disc-error-msg").innerHTML = " Please enter the Discription";
      return false;
    } else
    {
      document.getElementById("disc-error-msg").innerHTML = "";
    }
  
    // Validate image input
    if (image.files.length === 0) {
      document.getElementById("image-error-msg").innerHTML = " Please attach an image";
      // alert("Please attach an image");
      return false;
    }else
    {
      document.getElementById("image-error-msg").innerHTML = ""
    }
  
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(image.files[0].name)) {
      document.getElementById("image-error-msg").innerHTML = " Please attach a valid image file (jpg, jpeg, png, or gif)";
      // alert("Please attach a valid image file (jpg, jpeg, png, or gif)");
      image.value = "";
      return false;
    }else
    {
      document.getElementById("image-error-msg").innerHTML = ""
    }
  
    // Check the file size of the uploaded image
    var fileSize = image.files[0].size / 1024; // in KB
    if (fileSize > 750) {
      document.getElementById("image-error-msg").innerHTML = " Please attach an image that is smaller than 750KB";
      // alert("Please attach an image that is smaller than 750KB");
      image.value = "";
      return false;
    }
    else
    {
      document.getElementById("image-error-msg").innerHTML = "";
    }
    return true;
  }

  // Function to add Data
function AddData() {
    if (validateForm() == true) {
      let name = document.getElementById("name").value;
      let price = document.getElementById("price").value;
      let description = document.getElementById("description").value;
      let image = document.getElementById("inputGroupFile01");
      const reader = new FileReader();
  
      let productList;
      if (localStorage.getItem("productList") == null) {
        productList = [];
      } else {
        productList = JSON.parse(localStorage.getItem("productList"));
      }
  
      // generate new ID by incrementing the highest existing ID
      let id = 1;
      if (productList.length > 0) {
        let ids = productList.map((product) => product.id);
        id = Math.max(...ids) + 1;
      }
  
      reader.readAsDataURL(image.files[0]);
      reader.addEventListener("load", () => {
        productList.push({
          id: id,
          name: name,
          description: description,
          price: price,
          image: reader.result,
        });
        localStorage.setItem("productList", JSON.stringify(productList));
        location.reload();
        showData();
      });
  
      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("description").value = "";
      document.getElementById("inputGroupFile01").value = "";
      document.getElementById("close-btn").click();
      alert("Data Added Successfully");
    }
  }