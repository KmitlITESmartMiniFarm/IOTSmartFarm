function stop_listen(){
    dweetio.stop_listening();
    console.log('Stop Complete');
}


function listen_data(){
    dweetio.listen_for("eric_photon_PV", function(dweet){
       get_lastes();
    });
    
}

    
function get_lastes(){
    dweetio.get_latest_dweet_for("eric_photon_PV", function(err, dweet){

        var dweet = dweet[0]; // Dweet is always an array of 1
        // Temp
       var Temp = dweet.content.tempISO;
       // Humidity 
       var Humidity = dweet.content.humISO;
       var wattage = dweet.content.wattage;
   
        console.log(Temp); // The content of the dweet
        console.log(Humidity);
        console.log(wattage);
        console.log(dweet.created); // The create date of the dweet

        updateDonutChart('#specificChart', Temp, true);
        updateDonutChart('#specificChart2', Humidity, true);
        updateDonutChart('#specificChart3', wattage, true);
        
    });
}




/**
 * Updates the donut chart's percent number and the CSS positioning of the progress bar.
 * Also allows you to set if it is a donut or pie chart
 * @param  {string}  el      The selector for the donut to update. '#thing'
 * @param  {number}  percent Passing in 22.3 will make the chart show 22%
 * @param  {boolean} donut   True shows donut, false shows pie
 */
function updateDonutChart (el, percent, donut) {
  percent = Math.round(percent);
  if (percent > 100) {
      percent = 100;
  } else if (percent < 0) {
      percent = 0;
  }
  var deg = Math.round(360 * (percent / 100));

  if (percent > 50) {
      $(el + ' .pie').css('clip', 'rect(auto, auto, auto, auto)');
      $(el + ' .right-side').css('transform', 'rotate(180deg)');
  } else {
      $(el + ' .pie').css('clip', 'rect(0, 1em, 1em, 0.5em)');
      $(el + ' .right-side').css('transform', 'rotate(0deg)');
  }
  if (donut) {
      $(el + ' .right-side').css('border-width', '0.1em');
      $(el + ' .left-side').css('border-width', '0.1em');
      $(el + ' .shadow').css('border-width', '0.1em');
  } else {
      $(el + ' .right-side').css('border-width', '0.5em');
      $(el + ' .left-side').css('border-width', '0.5em');
      $(el + ' .shadow').css('border-width', '0.5em');
  }
  $(el + ' .num').text(percent);
  $(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
}
