let $inputPosX;
let $inputPosY;
let $inputColor;
let $inputSize;
let $inputWidth;
let $inputHeight;
let $inputAmount;

$(document).ready(function(){
    $inputPosX = $("#positionX");
    $inputPosY = $("#positionY");

    $inputColor = $("#color");
    $inputSize = $("#size");
    $inputWidth = $("#width");
    $inputHeight = $("#height");
    $inputAmount = $("#amount");

    updateFormElements();

    //ZEICHNEN BEI KLICK
    $("#draw").click(function(){
        validateInputAndDraw();
    });

    $("#empty").click(function(){
        $("#paintArea").children().remove();
    });

    $("#shape").change(function() {
        updateFormElements();
    });

    //ZEICHNEN BEI KLICK
    let canvas = $("#paintArea");
    canvas.bind('click',function(e){
        $inputPosX = e.clientX;
        $inputPosY = e.clientY;

        //Position überprüfen
        console.log($inputPosX);
        console.log($inputPosY);
        validateInputAndDraw();
    });
});

function updateFormElements() {
    let shape = $("#shape").val();
    switch(shape) {
        case "square":
            $inputSize.parent().show();
            $inputWidth.parent().hide();
            $inputHeight.parent().hide();
            $inputAmount.parent().hide();
            break;
        case "rectangle":
            $inputSize.parent().hide();
            $inputWidth.parent().show();
            $inputHeight.parent().show();
            $inputAmount.parent().hide();
            break;
        case "cross":
            $inputSize.parent().hide();
            $inputWidth.parent().show();
            $inputHeight.parent().show();
            $inputAmount.parent().hide();
            break;
        case "frame":
            $inputSize.parent().show();
            $inputWidth.parent().hide();
            $inputHeight.parent().hide();
            $inputAmount.parent().show();
            break;
        case "oval":
            $inputSize.parent().hide();
            $inputWidth.parent().show();
            $inputHeight.parent().show();
            break;
        default:
            break;
    }
}

function validateInputAndDraw() {
    let shape = document.paintForm.shape.options[document.paintForm.shape.selectedIndex].value;
    let color = checkInputField("color");

    //ZEICHNEN BEI KLICK
    let positionX;
    let positionY;

    if(!isNaN($inputPosX) || !isNaN($inputPosY)){
        positionX = $inputPosX;
        positionY = $inputPosY;
    } else {
        positionX = checkInputField("positionX");
        positionY = checkInputField("positionY");
    }

    let size = checkInputField("size");

    switch(shape) {
        case "square":
            size = checkInputField("size");

            let square = new Square(Number(positionX),Number(positionY),color,Number(size));
            console.log(square);
            square.draw($("#paintArea"));

            break;
        case "rectangle":
            let width = checkInputField("width");
            let height = checkInputField("height");

            let rect = new Rectangle(Number(positionX),Number(positionY),color,Number(width),Number(height));
            console.log(rect);
            rect.draw($("#paintArea"));

            break;
        case "cross":
            let widthCrossy = checkInputField("width");     //anders benennen, sondern überschreibts width und height
            let heightCrossy = checkInputField("height");   //von Rectangle... auch leichte Fehler werden immer wieder gemacht

            let cross = new Cross(Number(positionX),Number(positionY),color,Number(widthCrossy),Number(heightCrossy));
            console.log(cross);
            cross.draw($("#paintArea"));

            //anderer Lösungsansatz - Cross aus zwei Rechtecken basteln... hat ned so funktioniert
            /*size = checkInputField("size");
            let cross = new Cross(Number(positionX), Number(positionY), color);

            let rect1 = new Rectangle(10,0,"aaffcc", 50, 100);
            cross.addPaintObj(rect1);

            let rect2 = new Rectangle(0, 50, "aaffcc", 100, 50);
            cross.addPaintObj(rect2);*/
            break;
        case "frame":
            size = checkInputField("size");
            let amount = checkInputField("amount");

            let frame = new Frame(Number(positionX), Number(positionY), color);

            let r1 = new Rectangle(0,0,"#aabbcc", 5, 10);
            frame.addPaintObj(r1);

            let s1 = new Square(100,100,"#aaffcc", 50);
            frame.addPaintObj(s1);

            frame.draw($("#paintArea"));
            break;
        case "oval":
            let widthOval = checkInputField("width");
            let heightOval = checkInputField("height");

            let oval = new Oval(Number(positionX),Number(positionY),color,Number(widthOval),Number(heightOval));
            console.log(oval);
            oval.draw($("#paintArea"));

            break;
        default:
            break;
    }
}

function checkInputField(id) {
    let $inputField = $("#"+id);

    if($inputField.val() == "" ) {
        $inputField.css("border","1px solid red"); //roter Rahmen
        return "";
    } else {
        $inputField.css("border","1px solid #cdcdcd");
        return $inputField.val();
    }
}


