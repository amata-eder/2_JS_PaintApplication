//needed some help from
// https://www.on-design.de/tutor/javascript/jQuery/

"use strict"

//Superklasse - Basisklasse
class PaintObj{
    constructor(posX,posY,color="#fff"){
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        //Zeichenbereich
        this.div = undefined;       //alle Figuren werden auf so einem Div gezeichnet
    }
    //Methoden
    draw(parent){
        //div und Grundcss werden angelegt; alles wird absolut gesetzt
        this.div = $("<div></div>");

        this.div.css({
            position: "absolute",
            top: this.posY + "px",
            left: this.posX + "px",
            backgroundColor : this.color
        });
        $(parent).append(this.div); //in Dom-Baum einhängen
        this.setClickHandler(); //zum Löschen brauchts einen ClickHandler
    }


    //MARKIEREN UND LÖSCHEN EINER FIGUR
    setClickHandler(){
        console.log("Bin schonmal in dieser Function angekommen :)");
        //LÄUFT:
        //jedoch funktioniert das hier nur mit hover, mit der click function gehts nicht... warum???
        this.div.hover(function(){
            $(this).addClass("paintObj");  //Klasse wird hinzugefügt

            if($(this).parent()[0].className != "paintObj"){
                $(this).css({
                    border : "2px solid red",
                });
            }
        }, function(){
            $(this).css("border", "none");
        });

        this.div.on("click", function (e) {
            e.stopPropagation(); //damits keine Figur direkt daneben malt - vorheriger Handler wird abgewürgt :P
            if($(this).parent()[0].className == "paintObj"){
                if(confirm("Dieses Objekt löschen?")){
                    $(this).parent()[0].remove();
                }
            } else{
                if(confirm("Dieses Objekt löschen?")){
                    $(this).remove();
                }
            }
        });

        //Hint von Schönböck: e.stopPropagation()
    }

    //Aus der Übung
    /*deleteElement(){
        this.div.remove();
    }*/

    getWidth(){
        //Hinweis, dass die Klasse eigentlich abstract sein sollte!!!
        //So kann Programmierer "sanft" darauf hingewiesen werden, dass
        //diese Methode überschrieben werden sollte.
        throw "Method abstract - please overwrite in subclass!";
    }

    getHeight(){
        throw "Method abstract - please overwrite in subclass!";
    }
}

//-------------------------------------------------------------------------
class Square extends PaintObj{
    constructor(posX,posY,color="#fff", size=50){
        super(posX,posY,color);     //etwas erweitern; methoden wieder verwenden zb von der Basisklasse
        this.size = size;
    }

    draw(parent){
        super.draw(parent);
        this.div.css({
            width: this.size + "px",
            height: this.size + "px",
        });
    }

    getWidth() {
        return this.size;
    }

    getHeight() {
        return this.size;
    }
}

//-------------------------------------------------------------------
//Rectangle erbt von PaintObj
class Rectangle extends PaintObj{
    constructor(posX,posY,color="#fff",width=50,height=100){
        super(posX,posY,color);     //etwas erweitern; methoden wieder verwenden zb von der Basisklasse
        this.width = width;
        this.height = height;
    }

    draw(parent){
        //Führt Code der Superklasse aus (in unserem Fall PaintObj)
        super.draw(parent);
        this.div.css({
            width: this.width + "px",
            height: this.height + "px",
        });
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}

//-------------------------------------------------------------------------
class Cross extends PaintObj{
    constructor(posX, posY, color, width, height) {
        super(posX,posY,color);     //etwas erweitern; methoden wieder verwenden zb von der Basisklasse
        this.width = width;
        this.height = height;

        this.container = new Rectangle(posX, posY, "#000ff", width, height);
        this.vertical = new Rectangle((width/3), 0, color, (width/3), height);
        this.horizontal = new Rectangle(0, height/3, color, width, (height/3));

        //Anderer Versuch
        /*this.rect1 = new Rectangle(posX, posY,"aaffcc", width, height);
        this.rect2 = new Rectangle(width/2, 0,"aaffcc", width/2, height);*/
    }

    draw($parent){
        this.container.draw($parent);
        this.vertical.draw(this.container.div);
        this.horizontal.draw(this.container.div);
    }

    //Anderer Versuch
    /*draw($parent){
        //Führt Code der Superklasse aus (in unserem Fall PaintObj)
        /*super.draw(parent);
        this.div.css({
            width: this.width + "px",
            height: this.height + "px",
        });*/

    /*this.rect1.draw($parent);
    this.rect2.draw(this.rect1.div);
}*/

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}

//-------------------------------------------------------------------------
class Frame extends Rectangle{
    constructor(posX, posY, color) {
        super(posX, posY, color, 0, 0);
        //Kinder speichern (Rechtecke, Quadrate bzw. Frames)
        this.elements = [];
    }

    addPaintObj(po){
        let w = po.getWidth();
        let h = po.getHeight();

        if(this.width < po.posX + w){
            this.width = po.posX + w;
        }

        if(this.height < po.posY + h){
            this.height = po.posY + h;
        }

        //Einfügen des PaintObjects (PO) in die Liste der Elemente
        this.elements.push(po);        //push fügt neuen Wert (po) hinten an Liste an
    }

    draw(parent) {
        super.draw(parent);     //zeichnet umgebenden Rahmen an sich
        //Elemente (Kinder) Zeichnen
        for(let children of this.elements){     //Kinder aus array rausholen
            children.draw(this.div);
        }
    }
}
//-------------------------------------------------------------------------
//help from https://jsfiddle.net/simurai/LxKvU/
class Oval extends PaintObj{        //wie Klasse Rechteck
    constructor(posX, posY, color="#fff", width=50, height=100){
        super(posX, posY, color);
        this.width = width;
        this.height = height;
    }

    draw($parent) {
        //Führt Code der Superklasse aus (in unserem Fall PaintObj)
        super.draw($parent);
        this.div.css({
            width: this.width + "px",
            height: this.height + "px",
            borderRadius: 50+"%",   //damit es zu einem Oval wird
        });
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}


