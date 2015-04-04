/**
 * Created by Ramish on 4/1/15.
 */
var getPageTableFrames;
var getPhysicalFramesNumber;
var frameStack=[];
var referenceStringArray=[7,7,0,1];
//var range=[0,1,2,3,4,5,6,7];

function getPageFrames(){
    getPageTableFrames=parseInt(document.getElementById("pageFrameNumber").value);
}

function getPhysicalFrames(){
    getPhysicalFramesNumber=parseInt(document.getElementById("physicalFrameNumber").value);
}


function initializeFrameStack(pageTableFrames){
    for(var count=0;count<pageTableFrames;count++){
        frameStack[count]=-1;
    }
}

function generateRandomReferenceString(){
    initializeFrameStack(getPageTableFrames);

//    for(var count=0;count<getPhysicalFramesNumber;count++){
//        referenceStringArray[count]=Math.floor((Math.random()*8));
//    }
    console.log(frameStack);
    console.log(referenceStringArray);
}

function generateLRU(){
    generateRandomReferenceString();
    var currentPageFrame,secondCounter,thirdCounter;
    for(currentPageFrame=0;currentPageFrame<referenceStringArray.length;currentPageFrame++){
        loopingFrameStack:{
            for(secondCounter=0;secondCounter<frameStack.length;secondCounter++){
                if(frameStack[secondCounter]==-1){
                    for(thirdCounter=currentPageFrame;thirdCounter>0;thirdCounter--){
                        if(referenceStringArray[currentPageFrame]==referenceStringArray[thirdCounter-1]){
                            break loopingFrameStack;
                        }
                    }
                    frameStack[secondCounter]=referenceStringArray[currentPageFrame];
                    break loopingFrameStack;
                }
            }

        }
//        console.log(referenceStringArray);
        console.log("FrameStack"+frameStack);
    }

}

