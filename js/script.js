// Start upload preview image
Window.parent.$(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");
                        var $uploadCrop,
                        tempFilename,
                        rawImg,
                        imageId;
                        function readFile(input) {
                            if (input.files && input.files[0]) {
                              var reader = new FileReader();
                                reader.onload = function (e) {
                                    Window.parent.$('.upload-demo').addClass('ready');
                                    Window.parent.$('#cropImagePop').modal('show');
                                    rawImg = e.target.result;
                                    console.log(rawImg)
                                }
                                reader.readAsDataURL(input.files[0]);
                            }
                            else {
                                swal("Sorry - you're browser doesn't support the FileReader API");
                            }
                        }

                        $uploadCrop = Window.parent.$('#upload-demo').croppie({
                            viewport: {
                                width: 150,
                                height: 150,
                            },
                            enforceBoundary: false,
                            enableExif: true
                        });
                        Window.parent.$('#cropImagePop').on('shown.bs.modal', function(){
                            // alert('Shown pop');
                            $uploadCrop.croppie('bind', {
                                url: rawImg
                            }).then(function(){
                                console.log('jQuery bind complete');
                            });
                        });

                        Window.parent.$('.item-img').on('change', function () { imageId = Window.parent.$(this).data('id'); tempFilename = Window.parent.$(this).val();
                                                                                                         Window.parent.$('#cancelCropBtn').data('id', imageId); readFile(this); });
                        Window.parent.$('#cropImageBtn').on('click', function (ev) {
                            $uploadCrop.croppie('result', {
                                type: 'base64',
                                format: 'jpeg',
                                size: {width: 150, height: 200}
                            }).then(function (resp) {
                                Window.parent.$('#item-img-output').attr('src', resp);
                                console.log(resp)
                                Window.parent.$('#cropImagePop').modal('hide');
                            });
                        });
                // End upload preview image








