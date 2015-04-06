/**
 * Created by Ramish on 4/1/15.
 */
var getPageTableFrames;
var getPhysicalFramesNumber;
var framesArray=[];
var referenceStringArray=[];
//var referenceStringArray=[7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7];
var lruStack=[];
//var temp4ReferenceRepeat=0;
//var tempCnt=1;
var run=-1;
var frames;

function getPageFrames(){
    getPageTableFrames=parseInt(document.getElementById("pageFrameNumber").value);
}

function getPhysicalFrames(){
    getPhysicalFramesNumber=parseInt(document.getElementById("physicalFrameNumber").value);
}


function initializeFrameStack(pageTableFrames){
    for(var count=0;count<pageTableFrames;count++){
        framesArray[count]=-1;
    }
}

function loopingFramesArray(){
    var tempCnt=0;
    for(var temp= 0;temp<framesArray.length;temp++){
        if(framesArray[temp]!=-1){
            tempCnt++;
        }
    }
    console.log("TempCnt="+tempCnt);
    if(tempCnt==framesArray.length)
        return true;
    else
        return false;
}

function checkReferenceRepeat(currentReferenceCounter){
    var temp4ReferenceRepeat=0;
    for(var counter=currentReferenceCounter;counter>0;counter--){
        if(referenceStringArray[currentReferenceCounter]==referenceStringArray[counter-1]){
            temp4ReferenceRepeat++;
        }
    }

    console.log("temp4referenceRepeat="+temp4ReferenceRepeat);
    if(temp4ReferenceRepeat==0){
        return true;}
    else{

        if(checkLruStackExist(currentReferenceCounter)){
            lruStack.splice(returnExistingLruStackPosition(currentReferenceCounter),1);
            lruStack.unshift(referenceStringArray[currentReferenceCounter]);
            return false;
        }
        else{
            var gettingLastValueLruStack=lruStack.pop();
            lruStack.unshift(referenceStringArray[currentReferenceCounter]);
            updateFramesArray(gettingLastValueLruStack);
            return false;}
        }


}
function updateFramesArray(lastValueLruStack){
    for(var findingReferenceString=0;findingReferenceString<framesArray.length;findingReferenceString++){
        if(framesArray[findingReferenceString]==lastValueLruStack){
            framesArray[findingReferenceString]=lruStack[0];
        }
    }
}


function checkLruStackExist(currentReferenceCounter){
    var flag=false;
    console.log("lruStackIncheckLruStackExist="+lruStack);
    for(var count=0;count<lruStack.length;count++){
        if(referenceStringArray[currentReferenceCounter]==lruStack[count]){
            flag=true;
        }
    }
    return flag;
}

function returnExistingLruStackPosition(currentReferenceCounter){
    for(var count=0;count<lruStack.length;count++){
        if(referenceStringArray[currentReferenceCounter]==lruStack[count]){
            return count;
        }
    }

}

function generateRandomReferenceString(){
    initializeFrameStack(getPageTableFrames);

    for(var count=0;count<getPhysicalFramesNumber;count++){
        referenceStringArray[count]=Math.floor((Math.random()*8));
    }
    console.log(framesArray);
    console.log(referenceStringArray);
}

function generateLRU(){
    generateRandomReferenceString();
    var currentPageFrame,secondCounter,thirdCounter;
    for(currentPageFrame=0;currentPageFrame<referenceStringArray.length;currentPageFrame++){
        AgainLoopingFrameArray:{
            if(loopingFramesArray()){

                if(checkReferenceRepeat(currentPageFrame)){

                    var lastValueOfLRU=lruStack.pop();
                    console.log("lastValueOfLRU="+lastValueOfLRU);
                    lruStack.unshift(referenceStringArray[currentPageFrame]);
                    console.log("lruStack[0]="+lruStack[0]);
                    for(var finderReferenceString=0;finderReferenceString<framesArray.length;finderReferenceString++){
                        if(framesArray[finderReferenceString]==lastValueOfLRU){
                            framesArray[finderReferenceString]=lruStack[0];
                        }
                    }

                }

                else{
                    break AgainLoopingFrameArray;
                }
            }
        }

        loopingFrameArray:{
            for(secondCounter=0;secondCounter<framesArray.length;secondCounter++){
                if(framesArray[secondCounter]==-1){
                    for(thirdCounter=currentPageFrame;thirdCounter>0;thirdCounter--){
                        if(referenceStringArray[currentPageFrame]==referenceStringArray[thirdCounter-1]){
                            break loopingFrameArray;
                        }
                    }
                    framesArray[secondCounter]=referenceStringArray[currentPageFrame];
                    lruStack.unshift(referenceStringArray[currentPageFrame]);
                    break loopingFrameArray;
                }
            }
        }

        console.log(lruStack);
        console.log("PageFrame="+framesArray);


        document.getElementById("printReplacement").innerHTML+="<div class='showReplacement'>" +
            "<div class='referenceString'>"+referenceStringArray[currentPageFrame]+"</div>" +
            "<ul class='pageFrames'>"+
//            "<ul class='pageFrames'>" +showFrames(framesArray)+
            "<li>"+framesArray[0]+"</li><li>"+framesArray[1]+"</li><li>"+framesArray[2]+"</li>" +
            "</ul></div>";


    }

}

//function showFrames(gettingFramesArray){
//    console.log("Show FrameArray==="+gettingFramesArray);
//    frames=document.getElementById("printReplacement").innerHTML+="<li>"+gettingFramesArray[++run]+"</li>";
//    if(run!=gettingFramesArray.length-1){
//        console.log("entered into if condition & show run="+run);
//        showFrames(framesArray);
//    }
//    else{
//        console.log("means run is 2");
//        console.log("framesHTML"+frames);
//        run=-1;
//        return frames;
//    }
//
//}


