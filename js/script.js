window.parent.$(function () {
    $image_crop = window.parent.$('#image_demo').croppie(
        {
            enableExif: true,
            viewport: {
                width: 150,
                height: 150,
                type: 'circle'
            },
            boundary: {
                width: 300,
                height: 300
            }
        });

    window.parent.$('#btnGrab').click(function () {
        window.parent.$('#upload_image').click();
    });

    var selectedFile;

    window.parent.$("#upload_image").change(function (evt) {
        if ((selectedFile = evt.target.files[0])) {
            validateImageSizeType(selectedFile);
        }
    });

    function validateImageSizeType(selectedImage){
        var _URL = window.URL || window.webkitURL;
        var img = new Image();

        img.onload = function() {
            if(this.width >= 200 && this.height >= 200){
                readImgShowModal(selectedImage);
            }
            else
            {
                showAlert("This image doesn't have the minimum size required: 200px / 200px");
                window.parent.$('#upload_image').val('');
            }
        };

        img.onerror = function() {
            showAlert("File type not valid: " + selectedImage.type);
        };
        
        img.src = _URL.createObjectURL(selectedImage);
    }

    function showAlert(msj) {
        window.parent.$('#AddAlertMessage').html(msj);
        window.parent.$("#AddAlert").show();
        setTimeout(function () { window.parent.$("#AddAlert").hide(); }, 3500);
    }

    function readImgShowModal(selectedImg){
        
        //document.getElementById("upload_image").value = "";
        window.parent.$('#upload_image').val('');

        var reader = new FileReader();
        reader.onload = function (event) {
            $image_crop.croppie('bind', {
                url: event.target.result
            }).then(function () {
                console.log('Bind complete!');
            });
        }
        reader.readAsDataURL(selectedImg);
        window.parent.window.parent.$('#uploadImageModal').modal('show');
    }

    window.parent.$('#closeModal').click(function(){
        var vmyImage = document.getElementById("myImage");
        var vmyImg = new Image();

        vmyImage.title = "Your image!";
        vmyImg.title = "Your image!";

        var nameImage = document.getElementById("nameMyImage");
        var nameImg = document.getElementById("nameMyImg");

        nameImage.innerHTML = "avatar";
        nameImg.innerHTML = "avatar";
        
        vmyImage.src = "img/avatar-default-icon.png";
        vmyImg.src = "img/avatar_placeholder_temporary.png";

        vmyImg.className = "img-thumbnail img-chosen";
        vmyImg.alt = "Your image!";

        document.getElementById('myImg').innerHTML = "";
        document.getElementById('myImg').append(vmyImg);
    });

    window.parent.window.parent.$('#confirmCrop').click(function () {
        $image_crop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (response) {            
            window.parent.window.parent.$('#noteInfo').html('You can select another picture!');

            withJSpure(response);

            window.parent.window.parent.$('#nameMyImg').html(selectedFile.name);

            window.parent.window.parent.$('#myImg').html('');
            window.parent.window.parent.$("<img>", {
                "src": response,
                "class": 'img-thumbnail img-chosen',
                "alt": 'Your image!',
                "title": selectedFile.name
            }).appendTo("#myImg");            

            window.parent.window.parent.$('#uploadImageModal').modal('hide');
        })
    });

    function withJSpure(resp) {
        var imgtag = document.getElementById("myImage");
        imgtag.title = selectedFile.name;

        var nameImg = document.getElementById("nameMyImage");
        
        imgtag.src = resp;
    }

    /*     window.parent.$('#upload_image').change(function (evnt) {
            window.parent.$('#noteInfo').html('You can select another picture!');
        
            onChangeUploadJSpure(evnt);
        
            var selectedFile = event.target.files[0];
            var reader = new FileReader();
        
            window.parent.$('#myImg').attr('title', selectedFile.name);
            window.parent.$('#nameMyImg').html(selectedFile.name);
        
            reader.onload = function (event) {
                window.parent.$("#myImg").attr("src", event.target.result);
            };
        
            reader.readAsDataURL(selectedFile);
        }); */

    /* function onChangeUploadJSpure(evt) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("myImage");
        imgtag.title = selectedFile.name;

        var nameImg = document.getElementById("nameMyImage");
        nameImg.innerHTML = selectedFile.name;

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    } */
});
