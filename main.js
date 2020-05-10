window.addEventListener("load", () => {
    let long;
    let lat;
    let tempSummary = document.querySelector(".temp-summary");
    let temp = document.querySelector(".temp");
    let location = document.querySelector(".location");
    const tempSection = document.querySelector(".temp-section");
    const tempSpan = document.querySelector(".temp-section span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);
            const proxy = `https://cors-anywhere.herokuapp.com/`;
      
            const api = `${ proxy } //insertAPI Here// ${ lat },${ long }`;
            fetch(api)
            .then(data => {
                return data.json()
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                temp.textContent = temperature;
                tempSummary.textContent = summary;
                location.textContent = data.timezone;
                let celcius = (temperature - 32) * (5 / 9);  
                celcius = Math.round(celcius * 100) / 100;              
                setIcons(icon, document.querySelector(".icon"));
                tempSection.addEventListener("click", () => {
                    if(tempSpan.textContent === "F") {
                        tempSpan.textContent = "C";
                        temp.textContent = celcius;
                    }
                    else {
                        tempSpan.textContent = "F";
                        temp.textContent = temperature;
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })
        })        
    }
    else {
        h1.textContent = "must allow location";
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace("-", "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
