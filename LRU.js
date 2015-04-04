/**
 * Created by Ramish on 4/1/15.
 */
var getPageTableFrames;
var getPhysicalFramesNumber;
var framesArray=[];
var referenceStringArray=[7,7,0,1,2];
var lruStack=[];
var temp4ReferenceRepeat=0;
var tempCnt=1;


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

    for(var temp=0;temp<framesArray.length;temp++){
        if(framesArray[temp]!=1){
            tempCnt++;
        }
    }
    if(tempCnt==framesArray.length)
        return true;
    else
        return false;
}

function checkReferenceRepeat(currentReferenceCounter){

    for(var counter=currentReferenceCounter;counter>0;counter--){
        if(referenceStringArray[currentReferenceCounter]==referenceStringArray[counter-1]){
            temp4ReferenceRepeat++;
        }
    }

    if(temp4ReferenceRepeat==currentReferenceCounter){
        return true;}
    else{
        return false;}

}

function generateRandomReferenceString(){
    initializeFrameStack(getPageTableFrames);

//    for(var count=0;count<getPhysicalFramesNumber;count++){
//        referenceStringArray[count]=Math.floor((Math.random()*8));
//    }
    console.log(framesArray);
    console.log(referenceStringArray);
}

function generateLRU(){
    generateRandomReferenceString();
    var currentPageFrame,secondCounter,thirdCounter;
    for(currentPageFrame=0;currentPageFrame<referenceStringArray.length;currentPageFrame++){
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
        AgainLoopingFrameArray:{
            if(loopingFramesArray()){
                if(checkReferenceRepeat(currentPageFrame)){
                    lruStack.pop();
                    lruStack.unshift(referenceStringArray[currentPageFrame]);
                    for(var finderReferenceString=0;finderReferenceString<framesArray.length;finderReferenceString++){
                        if(framesArray[finderReferenceString]==lruStack[0]){
                            finderReferenceString[finderReferenceString]=lruStack[0];
                        }
                    }

                }
                else{
                    break AgainLoopingFrameArray;
                }
            }
        }
        console.log(lruStack);
        console.log(framesArray);
    }

}

