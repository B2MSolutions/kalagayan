var _ = require('lodash'),
  AWS = require('aws-sdk');


function mapStateValue(stateValue) {
  switch (stateValue) {
    case 'OK':
      return 'OK';
    case 'INSUFFICIENT_DATA':
      return '?';
    case 'ALARM':
      return 'Fail';
  }
}

exports.list = function(req, res) {
  var cloudwatch = new AWS.CloudWatch();
  cloudwatch.describeAlarms(null, function(err, data) {
    if (err) {
      console.log(err); // an error occurred
      return res.send(500);
    } else {

      var services = _.map(data.MetricAlarms, function(alarm) {
        return {
          name: alarm.AlarmName,
          status: mapStateValue(alarm.StateValue)
        };
      });

      return res.json(services);
    }
  });
};
