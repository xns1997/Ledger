
const candy = {
    backgroundColors:[
        'rgba(254, 96, 104, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(255, 205, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(68, 170, 254, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(201, 203, 207, 0.4)'
    ],
    borderColors: [
        'rgb(254, 5, 17)',
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(56, 5, 220)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
    ],
    length:9

};

const setRandomColorWithBorder = (e,colors)=>{
    let index = Math.floor(Math.random()*colors.length);
    e.style.borderColor = colors.borderColors[index];
    e.style.backgroundColor = colors.backgroundColors[index];
}

module.exports = {candy,setRandomColorWithBorder}