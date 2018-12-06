'use strict';
const mongotocsv = require('mongo-to-csv');

function SaveTemp(){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "success",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

            let options = {
                database: 'IoTsensors',
                collection: 'temperature',
                fields: ['topic','payload','mydate','mytime'],
                output: '../Sensor_Temperature.csv',
            };
            
            mongotocsv.export(options, function (err, success) {
                console.log(err);
            });
            console.log('Save Success !! ')

          swal("You Save Temperature to CSV !", {
            icon: "success",
          });

        } 
        else {
          swal("Thank");
        }
      });

}

function SaveHumid(){
    
let options = {
	database: 'IoTsensors',
	collection: 'Humidity',
	fields: ['topic','payload','mydate','mytime'],
	output: '../Sensor_Humidity.csv',
};

mongotocsv.export(options, function (err, success) {
	console.log(err);
});
}

