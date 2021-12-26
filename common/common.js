const setPercentage = (totalSales,currentSales) => {
    const progressPercentage = parseInt(currentSales)/parseInt(totalSales)*100;
    return progressPercentage;
}

const setStatus = (percentage)=>{
    if(percentage<=33)
        return "At risk";
    
    if(percentage<=66)
        return "Off track"
    
    return "On track"
}

module.exports = {
    setPercentage,
    setStatus
}