const setRect = (e,rect)=>{
    let rectData = rect.getBoundingClientRect();
    // console.log(rectData);
    try {
        e.style.left = rectData.x + "px";
        e.style.top = rectData.y + "px";
        e.style.width = rectData.width + "px";
        e.style.height = rectData.height + "px";
        return "haha";
    } catch (error) {
        return error;
    }
    
}

module.exports = {setRect};