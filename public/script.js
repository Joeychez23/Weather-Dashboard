const searchBtn = document.querySelector("#search");
const input = document.querySelector('#input');
const nameBox = document.querySelector('#nameBox');
const tempBox = document.querySelector('#tempBox');
const windBox = document.querySelector('#windBox');
const humBox = document.querySelector('#humBox');
const uvVal = document.querySelector('#uvVal');
const historyBox = document.querySelector('#historyBox');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');
const btn6 = document.querySelector('#btn6');
const btn7 = document.querySelector('#btn7');
const btn8 = document.querySelector('#btn8');
const btn9 = document.querySelector('#btn9');
const btn10 = document.querySelector('#btn10');

const date1 = document.querySelector('#date1');
const temp1 = document.querySelector('#temp1');
const wind1 = document.querySelector('#wind1');
const hum1 = document.querySelector('#hum1');

const date2 = document.querySelector('#date2');
const temp2 = document.querySelector('#temp2');
const wind2 = document.querySelector('#wind2');
const hum2 = document.querySelector('#hum2');

const date3 = document.querySelector('#date3');
const temp3 = document.querySelector('#temp3');
const wind3 = document.querySelector('#wind3');
const hum3 = document.querySelector('#hum3');

const date4 = document.querySelector('#date4');
const temp4 = document.querySelector('#temp4');
const wind4 = document.querySelector('#wind4');
const hum4 = document.querySelector('#hum4');

const date5 = document.querySelector('#date5');
const temp5 = document.querySelector('#temp5');
const wind5 = document.querySelector('#wind5');
const hum5 = document.querySelector('#hum5');

const imgB = document.querySelector('#imgB');
const imgS1 = document.querySelector('#imgS1');
const imgS2 = document.querySelector('#imgS2');
const imgS3 = document.querySelector('#imgS3');
const imgS4 = document.querySelector('#imgS4');
const imgS5 = document.querySelector('#imgS5');


var today = moment();

let btn
let loadVal = new Array();

$("#clear").click(function() {
    localStorage.clear();
})

const api_key = "2667f6ada07a46e09540cd05759781c5";
let cityName = '';



let passedCity = false;

let passedFore = false;

let lat

let lon



async function checkCity() {
    try{
        const api_url2 = `https://api.weatherbit.io/v2.0/current?&city=${cityName}&key=${api_key}&include=minutely&units=I`;
        const weather_response2 = await fetch(api_url2);
        const castData2 = await weather_response2.json();
        passedCity = true;
        return castData2;
    } catch {
        console.log("no value");
    }
}


async function checkFore() {
    try{
        const api_url2 = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${api_key}`;
        const weather_response2 = await fetch(api_url2);
        const castData2 = await weather_response2.json();
        passedFore = true;
        return castData2;
    } catch {
        console.log("no value");
        //return err;
    }
}




let id;


searchBtn.addEventListener("click", async function() {
    passedCity = false;
    passedFore = false;
    lat = 0;
    lon = 0;
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = input.value;
    if(cityName != '') {
        let val = await checkCity();
        cityName = val.data[0].city_name;
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();

        if(passedCity == true && passedFore == true) {
            for(let i = 0; i < localStorage.length; i++) {
                let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if(check.cityName == val.data[0].city_name) {
                    //console.log(check.cityName)
                    //console.log(val.data[0].city_name)
                    console.log("repeat");
                    checkRepeat =  true;
                }
            }
            loadVal.sort((a, b) => b.id - a.id);
            //console.log(loadVal);
            cityName = val.data[0].city_name.split(',');
            //console.log(cityName[0]);
            id += 1;
            if(checkRepeat = true) {
                entry =  {
                    id: id,//localStorage.length,
                    cityName: val.data[0].city_name
                }
            }
            let nice = localStorage.length + 1;
            if(checkRepeat = false) {
                entry =  {
                    id: id,//nice,
                    cityName: val.data[0].city_name
                }
            }
            nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
            localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
            tempBox.innerText = `Temp: ${val.data[0].temp}°`
            windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
            humBox.innerText = `Humidity: ${val.data[0].rh}%`
            let uv = val.data[0].uv;
            if(uv <= 2) {
                uvVal.style.backgroundColor = 'green';
            }
            if(uv > 2 && uv <= 5) {
                uvVal.style.backgroundColor = 'yellow';
            }
            if(uv > 5 && uv <= 7) {
                uvVal.style.backgroundColor = 'orange';
            }
            if(uv > 7 && uv <= 10) {
                uvVal.style.backgroundColor = 'red';
            }
            if(uv > 10) {
                uvVal.style.backgroundColor = 'purple';
            }
            uv = uv.toFixed(2);
            uvVal.innerText = `${uv}`




            for(let i = 0; i < localStorage.length; i++) {
                loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
                //console.log(loadVal[i]);
            }
            loadVal.sort((a, b) => b.id - a.id);
            //console.log(loadVal);




            date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
            temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
            wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
            hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

            date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
            temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
            wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
            hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

            date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
            temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
            wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
            hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

            date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
            temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
            wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
            hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

            date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
            temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
            wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
            hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






            //Set Big Image
            //console.log(val.data[0].weather.code)
            if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
                imgB.style.backgroundImage = "url('./public/images/t01d.png')";
            }
            if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
                imgB.style.backgroundImage = "url('./public/images/t04d.png')";
            }
            if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
                imgB.style.backgroundImage = "url('./public/images/d03d.png')";
            }
            if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
                imgB.style.backgroundImage = "url('./public/images/r02d.png')";
            }
            if(val.data[0].weather.code == 502) {
                imgB.style.backgroundImage = "url('./public/images/r03d.png')";
            }
            if(val.data[0].weather.code == 521) {
                imgB.style.backgroundImage = "url('./public/images/r05d.png')";
            }
            if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
                imgB.style.backgroundImage = "url('./public/images/s01d.png')";
            }
            if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
                imgB.style.backgroundImage = "url('./public/images/s02d.png')";
            }
            if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
                imgB.style.backgroundImage = "url('./public/images/s05d.png')";
            }
            if(val.data[0].weather.code == 623) {
                imgB.style.backgroundImage = "url('./public/images/s06d.png')";
            }
            if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
                imgB.style.backgroundImage = "url('./public/images/a01d.png')";
            }
            if(val.data[0].weather.code == 800) {
                imgB.style.backgroundImage = "url('./public/images/c01d.png')";
            }
            if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
                imgB.style.backgroundImage = "url('./public/images/c02d.png')";
            }
            if(val.data[0].weather.code == 803) {
                imgB.style.backgroundImage = "url('./public/images/c03d.png')";
            }
            if(val.data[0].weather.code == 804) {
                imgB.style.backgroundImage = "url('./public/images/c04d.png')";
            }
            if(val.data[0].weather.code == 900) {
                imgB.style.backgroundImage = "url('./public/images/u00d.png')";
            }













            //Set Small Image 1
            //console.log(foreVal.data[0].weather.code)
            if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
                imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
            }
            if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
                imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
            }
            if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
                imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
            }
            if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
                imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
            }
            if(foreVal.data[0].weather.code == 502) {
                imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
            }
            if(foreVal.data[0].weather.code == 521) {
                imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
            }
            if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
                imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
            }
            if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
                imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
            }
            if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
                imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
            }
            if(foreVal.data[0].weather.code == 623) {
                imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
            }
            if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
                imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
            }
            if(foreVal.data[0].weather.code == 800) {
                imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
            }
            if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
                imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
            }
            if(foreVal.data[0].weather.code == 803) {
                imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
            }
            if(foreVal.data[0].weather.code == 804) {
                imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
            }
            if(foreVal.data[0].weather.code == 900) {
                imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
            }







            //Set Small Image 2
            //console.log(foreVal.data[0].weather.code)
            if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
                imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
            }
            if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
                imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
            }
            if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
                imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
            }
            if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
                imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
            }
            if(foreVal.data[0].weather.code == 502) {
                imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
            }
            if(foreVal.data[0].weather.code == 521) {
                imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
            }
            if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
                imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
            }
            if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
                imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
            }
            if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
                imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
            }
            if(foreVal.data[0].weather.code == 623) {
                imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
            }
            if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
                imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
            }
            if(foreVal.data[0].weather.code == 800) {
                imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
            }
            if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
                imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
            }
            if(foreVal.data[0].weather.code == 803) {
                imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
            }
            if(foreVal.data[0].weather.code == 804) {
                imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
            }
            if(foreVal.data[0].weather.code == 900) {
                imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
            }








            //Set Small Image 3
            //console.log(foreVal.data[0].weather.code)
            if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
                imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
            }
            if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
                imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
            }
            if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
                imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
            }
            if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
                imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
            }
            if(foreVal.data[0].weather.code == 502) {
                imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
            }
            if(foreVal.data[0].weather.code == 521) {
                imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
            }
            if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
                imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
            }
            if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
                imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
            }
            if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
                imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
            }
            if(foreVal.data[0].weather.code == 623) {
                imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
            }
            if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
                imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
            }
            if(foreVal.data[0].weather.code == 800) {
                imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
            }
            if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
                imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
            }
            if(foreVal.data[0].weather.code == 803) {
                imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
            }
            if(foreVal.data[0].weather.code == 804) {
                imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
            }
            if(foreVal.data[0].weather.code == 900) {
                imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
            }








            //Set Small Image 4
            //console.log(foreVal.data[0].weather.code)
            if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
                imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
            }
            if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
                imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
            }
            if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
                imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
            }
            if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
                imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
            }
            if(foreVal.data[0].weather.code == 502) {
                imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
            }
            if(foreVal.data[0].weather.code == 521) {
                imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
            }
            if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
                imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
            }
            if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
                imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
            }
            if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
                imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
            }
            if(foreVal.data[0].weather.code == 623) {
                imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
            }
            if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
                imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
            }
            if(foreVal.data[0].weather.code == 800) {
                imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
            }
            if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
                imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
            }
            if(foreVal.data[0].weather.code == 803) {
                imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
            }
            if(foreVal.data[0].weather.code == 804) {
                imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
            }
            if(foreVal.data[0].weather.code == 900) {
                imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
            }





            //Set Small Image 5
            //console.log(foreVal.data[0].weather.code)
            if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
                imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
            }
            if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
                imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
            }
            if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
                imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
            }
            if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
                imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
            }
            if(foreVal.data[0].weather.code == 502) {
                imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
            }
            if(foreVal.data[0].weather.code == 521) {
                imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
            }
            if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
                imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
            }
            if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
                imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
            }
            if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
                imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
            }
            if(foreVal.data[0].weather.code == 623) {
                imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
            }
            if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
                imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
            }
            if(foreVal.data[0].weather.code == 800) {
                imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
            }
            if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
                imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
            }
            if(foreVal.data[0].weather.code == 803) {
                imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
            }
            if(foreVal.data[0].weather.code == 804) {
                imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
            }
            if(foreVal.data[0].weather.code == 900) {
                imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
            }


            buttons();
        }



    }
})






function buttons() {
    for(let i = 0; i < localStorage.length; i++) {
        if(i == 0) {
            btn1.style.display = "block";
            let set = loadVal[i];
            btn1.value = set.cityName;
            btn1.innerText = set.cityName;
        }
        if(i == 1) {
            btn2.style.display = "block";
            let set = loadVal[i];
            btn2.value = set.cityName;
            btn2.innerText = set.cityName;
        }
        if(i == 2) {
            btn3.style.display = "block";
            let set = loadVal[i];
            btn3.value = set.cityName;
            btn3.innerText = set.cityName;
        }
        if(i == 3) {
            btn4.style.display = "block";
            let set = loadVal[i];
            btn4.value = set.cityName;
            btn4.innerText = set.cityName;
        }
        if(i == 4) {
            btn5.style.display = "block";
            let set = loadVal[i];
            btn5.value = set.cityName;
            btn5.innerText = set.cityName;
        }
        if(i == 5) {
            btn6.style.display = "block";
            let set = loadVal[i];
            btn6.value = set.cityName;
            btn6.innerText = set.cityName;
        }
        if(i == 6) {
            btn7.style.display = "block";
            let set = loadVal[i];
            btn7.value = set.cityName;
            btn7.innerText = set.cityName;
        }
        if(i == 7) {
            btn8.style.display = "block";
            let set = loadVal[i];
            btn8.value = set.cityName;
            btn8.innerText = set.cityName;
        }
        if(i == 8) {
            btn9.style.display = "block";
            let set = loadVal[i];
            btn9.value = set.cityName;
            btn9.innerText = set.cityName;
        }if(i == 9) {
            btn10.style.display = "block";
            let set = loadVal[i];
            btn10.value = set.cityName;
            btn10.innerText = set.cityName;
        }
    }



}




async function loadPage() {
    today = moment();
    //console.log(localStorage);
    for(let i = 0; i < localStorage.length; i++) {
        loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        //console.log(loadVal[i]);
    }
    loadVal.sort((a, b) => b.id - a.id);
    //console.log(loadVal);
    if(loadVal.length > 0) {
        id = loadVal[0].id;
        cityName = loadVal[0].cityName.split(',');
        //console.log(cityName);
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`

        //console.log(val);

        //console.log(foreVal);


        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;



        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


    }





    buttons();



}


loadPage();







btn1.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn1.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})







btn2.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn2.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})






btn3.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn3.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})



btn4.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn4.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})




btn5.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn5.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})




btn6.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn6.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})




btn7.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn7.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})




btn8.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn8.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})




btn9.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn9.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})




btn10.addEventListener("click", async function() {
    today = moment();
    let checkRepeat =  false;
    let entry;
    cityName = btn10.value;
    if(cityName != '') {
        cityName = cityName.split(',');
        //console.log(cityName)
        cityName = cityName[0];
        let val = await checkCity();
        lat = val.data[0].lat;
        lon = val.data[0].lon;
        let foreVal = await checkFore();
        //console.log(foreVal);


        for(let i = 0; i < localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check.cityName == val.data[0].city_name) {
                //console.log(check.cityName)
                //console.log(val.data[0].city_name)
                console.log("repeat");
                checkRepeat =  true;
            }
        }
        loadVal.sort((a, b) => b.id - a.id);
        console.log(loadVal);
        cityName = val.data[0].city_name.split(',');
        //console.log(cityName[0]);
        id += 1;
        if(checkRepeat = true) {
            entry =  {
                id: id,//localStorage.length,
                cityName: val.data[0].city_name
            }
        }
        //console.log(localStorage.length)
        let nice = localStorage.length + 1;
        //console.log(id);
        if(checkRepeat = false) {
            entry =  {
                id: id,//nice,
                cityName: val.data[0].city_name
            }
        }
        //console.log(val);
        nameBox.innerText = `${val.data[0].city_name}  (${today.format("MMM Do, YYYY")})`;
        localStorage.setItem(`${val.data[0].city_name}`, JSON.stringify(entry));
        tempBox.innerText = `Temp: ${val.data[0].temp}°`
        windBox.innerText = `Wind: ${val.data[0].wind_spd}mph`
        humBox.innerText = `Humidity: ${val.data[0].rh}%`
        let uv = val.data[0].uv;
        if(uv <= 2) {
            uvVal.style.backgroundColor = 'green';
        }
        if(uv > 2 && uv <= 5) {
            uvVal.style.backgroundColor = 'yellow';
        }
        if(uv > 5 && uv <= 7) {
            uvVal.style.backgroundColor = 'orange';
        }
        if(uv > 7 && uv <= 10) {
            uvVal.style.backgroundColor = 'red';
        }
        if(uv > 10) {
            uvVal.style.backgroundColor = 'purple';
        }
        uv = uv.toFixed(2);
        uvVal.innerText = `${uv}`




        for(let i = 0; i < localStorage.length; i++) {
            loadVal[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(loadVal[i]);
        }
        loadVal.sort((a, b) => b.id - a.id);
        //console.log(loadVal);




        date1.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp1.innerText = `Temp: ${foreVal.data[1].temp}°`;
        wind1.innerText = `Wind: ${foreVal.data[1].wind_spd}mph`;
        hum1. innerText = `Humidity: ${foreVal.data[1].rh}%`;

        date2.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp2.innerText = `Temp: ${foreVal.data[2].temp}°`;
        wind2.innerText = `Wind: ${foreVal.data[2].wind_spd}mph`;
        hum2. innerText = `Humidity: ${foreVal.data[2].rh}%`;

        date3.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp3.innerText = `Temp: ${foreVal.data[3].temp}°`;
        wind3.innerText = `Wind: ${foreVal.data[3].wind_spd}mph`;
        hum3. innerText = `Humidity: ${foreVal.data[3].rh}%`;

        date4.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp4.innerText = `Temp: ${foreVal.data[4].temp}°`;
        wind4.innerText = `Wind: ${foreVal.data[4].wind_spd}mph`;
        hum4. innerText = `Humidity: ${foreVal.data[4].rh}%`;

        date5.innerText = `(${today.add(1,'days').format("MMM Do, YYYY")})`;
        temp5.innerText = `Temp: ${foreVal.data[5].temp}°`;
        wind5.innerText = `Wind: ${foreVal.data[5].wind_spd}mph`;
        hum5. innerText = `Humidity: ${foreVal.data[5].rh}%`;






        //Set Big Image
        //console.log(val.data[0].weather.code)
        if(val.data[0].weather.code == 200 || val.data[0].weather.code == 201 || val.data[0].weather.code == 202) {
            imgB.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(val.data[0].weather.code == 230 || val.data[0].weather.code == 231 || val.data[0].weather.code == 232 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(val.data[0].weather.code == 300 || val.data[0].weather.code == 301 || val.data[0].weather.code == 302 || val.data[0].weather.code == 233) {
            imgB.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(val.data[0].weather.code == 500 || val.data[0].weather.code == 501 || val.data[0].weather.code == 511 || val.data[0].weather.code == 520 || val.data[0].weather.code == 522) {
            imgB.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(val.data[0].weather.code == 502) {
            imgB.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(val.data[0].weather.code == 521) {
            imgB.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(val.data[0].weather.code == 600 || val.data[0].weather.code == 610 || val.data[0].weather.code == 621) {
            imgB.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(val.data[0].weather.code == 601 || val.data[0].weather.code == 602 || val.data[0].weather.code == 622) {
            imgB.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(val.data[0].weather.code == 611 || val.data[0].weather.code == 612) {
            imgB.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(val.data[0].weather.code == 623) {
            imgB.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(val.data[0].weather.code == 700 || val.data[0].weather.code == 711 || val.data[0].weather.code == 721 || val.data[0].weather.code == 731 || val.data[0].weather.code == 741 || val.data[0].weather.code == 751) {
            imgB.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(val.data[0].weather.code == 800) {
            imgB.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(val.data[0].weather.code == 801 || val.data[0].weather.code == 802) {
            imgB.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(val.data[0].weather.code == 803) {
            imgB.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(val.data[0].weather.code == 804) {
            imgB.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(val.data[0].weather.code == 900) {
            imgB.style.backgroundImage = "url('./public/images/u00d.png')";
        }













        //Set Small Image 1
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS1.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS1.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS1.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS1.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS1.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS1.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS1.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS1.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS1.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS1.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS1.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS1.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS1.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS1.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS1.style.backgroundImage = "url('./public/images/u00d.png')";
        }







        //Set Small Image 2
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS2.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS2.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS2.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS2.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS2.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS2.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS2.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS2.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS2.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS2.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS2.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS2.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS2.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS2.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS2.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 3
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS3.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS3.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS3.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS3.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS3.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS3.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS3.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS3.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS3.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS3.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS3.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS3.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS3.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS3.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS3.style.backgroundImage = "url('./public/images/u00d.png')";
        }








        //Set Small Image 4
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS4.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS4.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS4.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS4.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS4.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS4.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS4.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS4.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS4.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS4.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS4.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS4.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS4.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS4.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS4.style.backgroundImage = "url('./public/images/u00d.png')";
        }





        //Set Small Image 5
        //console.log(foreVal.data[0].weather.code)
        if(foreVal.data[0].weather.code == 200 || foreVal.data[0].weather.code == 201 || foreVal.data[0].weather.code == 202) {
            imgS5.style.backgroundImage = "url('./public/images/t01d.png')";
        }
        if(foreVal.data[0].weather.code == 230 || foreVal.data[0].weather.code == 231 || foreVal.data[0].weather.code == 232 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/t04d.png')";
        }
        if(foreVal.data[0].weather.code == 300 || foreVal.data[0].weather.code == 301 || foreVal.data[0].weather.code == 302 || foreVal.data[0].weather.code == 233) {
            imgS5.style.backgroundImage = "url('./public/images/d03d.png')";
        }
        if(foreVal.data[0].weather.code == 500 || foreVal.data[0].weather.code == 501 || foreVal.data[0].weather.code == 511 || foreVal.data[0].weather.code == 520 || foreVal.data[0].weather.code == 522) {
            imgS5.style.backgroundImage = "url('./public/images/r02d.png')";
        }
        if(foreVal.data[0].weather.code == 502) {
            imgS5.style.backgroundImage = "url('./public/images/r03d.png')";
        }
        if(foreVal.data[0].weather.code == 521) {
            imgS5.style.backgroundImage = "url('./public/images/r05d.png')";
        }
        if(foreVal.data[0].weather.code == 600 || foreVal.data[0].weather.code == 610 || foreVal.data[0].weather.code == 621) {
            imgS5.style.backgroundImage = "url('./public/images/s01d.png')";
        }
        if(foreVal.data[0].weather.code == 601 || foreVal.data[0].weather.code == 602 || foreVal.data[0].weather.code == 622) {
            imgS5.style.backgroundImage = "url('./public/images/s02d.png')";
        }
        if(foreVal.data[0].weather.code == 611 || foreVal.data[0].weather.code == 612) {
            imgS5.style.backgroundImage = "url('./public/images/s05d.png')";
        }
        if(foreVal.data[0].weather.code == 623) {
            imgS5.style.backgroundImage = "url('./public/images/s06d.png')";
        }
        if(foreVal.data[0].weather.code == 700 || foreVal.data[0].weather.code == 711 || foreVal.data[0].weather.code == 721 || foreVal.data[0].weather.code == 731 || foreVal.data[0].weather.code == 741 || foreVal.data[0].weather.code == 751) {
            imgS5.style.backgroundImage = "url('./public/images/a01d.png')";
        }
        if(foreVal.data[0].weather.code == 800) {
            imgS5.style.backgroundImage = "url('./public/images/c01d.png')";
        }
        if(foreVal.data[0].weather.code == 801 || foreVal.data[0].weather.code == 802) {
            imgS5.style.backgroundImage = "url('./public/images/c02d.png')";
        }
        if(foreVal.data[0].weather.code == 803) {
            imgS5.style.backgroundImage = "url('./public/images/c03d.png')";
        }
        if(foreVal.data[0].weather.code == 804) {
            imgS5.style.backgroundImage = "url('./public/images/c04d.png')";
        }
        if(foreVal.data[0].weather.code == 900) {
            imgS5.style.backgroundImage = "url('./public/images/u00d.png')";
        }


        buttons();



    }
})