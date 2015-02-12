(function() {

    window.onload = function() {
        /* Load data */
        d3.csv('data.csv', function(err, data) {
            if (err) {
                console.log("Error reading data file!", err);
                return;
            }

            _.each(data, function(d) {
                d.value = moment(d.date, "MM/DD/YYYY HH:mm:ss").valueOf();
            })

            render(data);
        })
    }

    function getDate(d) {
        var date = moment(d);
        date.hour(1);
        date.minute(0);
        date.second(0);
        return date.valueOf();
    }

    function getTime(d) {
        var date = moment(d);
        date.date(1);
        date.month(0);
        date.year(2012);
        return date.valueOf();
    }

    function redraw() {
        d3.selectAll(".circ")
            .transition(10)
            .style("opacity", function(d) {
                return d.selected ? 1 : 0.6;
            })
            .attr("r", function(d) {
                return d.selected ? 15 : 7;
            });
    }

    /* 
      Given a list of UTC dates, compute the minimum and maxium dates. Return a padded
      version of the min and max dates based on the temporal distance between them.
    */
    function timeRangePad(dates) {
      var minDate, maxDate;
      if (dates.length > 1) {
        minDate = moment(_.min(dates));
        maxDate = moment(_.max(dates));
        var paddingUnit = getDatePadding(minDate, maxDate);
        minDate.subtract(1, paddingUnit);
        maxDate.add(1, paddingUnit);
      } else {
        minDate = moment(dates[0]).subtract(1, 'hour');
        maxDate = moment(dates[0]).add(1, 'hour');
      }
      return {'minDate': minDate, 'maxDate': maxDate};
    };

    function getDatePadding(minDate, maxDate) {
      if (maxDate.diff(minDate, 'years') > 0)
        return 'years';
      else if (maxDate.diff(minDate, 'months') > 0)
        return 'months';
      else if (maxDate.diff(minDate, 'days') > 0)
        return 'days';
      else if (maxDate.diff(minDate, 'hours') > 0)
        return 'hours';
      else if (maxDate.diff(minDate, 'minutes') > 0)
        return 'minutes';
      else
        return 'seconds';
    }


    function render(data) {
        var margin = {
                top: 10,
                right: 25,
                bottom: 15,
                left: 25
            },
            width = window.innerWidth - 100,
            height = 300 - margin.top - margin.bottom;

        var x = d3.time.scale().range([0 + margin.right, width - margin.left]),
            y = d3.time.scale()
            .range([margin.top, height - margin.bottom - margin.top]);

        var ticks = width > 800 ? 8 : 4;
        var xAxis = d3.svg.axis().scale(x).orient("bottom")
            .ticks(ticks)
            .tickSize(-height, 0)
            .tickFormat(d3.time.format("%m/%d/%y"));

        var yAxis = d3.svg.axis().scale(y).orient("left")
            .ticks(5)
            .tickSize(-width + margin.right, margin.left)
            .tickFormat(d3.time.format("%H:%M"));

        var padded = timeRangePad(_.pluck(data, 'value'));

        x.domain(d3.extent([padded.minDate, padded.maxDate]));
        var start = new Date(2012, 0, 1, 0, 0, 0, 0).getTime();
        var stop = new Date(2012, 0, 1, 23, 59, 59, 59).getTime();
        y.domain(d3.extent([stop, start]));

        var svg = d3.select(".timeseries").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
            .call(xAxis);

        context.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(40," + 0 + ")")
            .call(yAxis);

        context.selectAll(".circ")
            .data(data)
            .enter().append("circle")
            .attr("class", "circ")
            .attr("cx", function(d) {
                return x(getDate(d.value));
            })
            .attr("cy", function(d, i) {
                return y(getTime(d.value));
            })
            .attr("r", 9)

            var brush = d3.svg.brush()
                .x(x)
                .on("brush", _.throttle(brushed, 200));

            context.append("g")
                .attr("class", "brush")
                .call(brush)
                .selectAll("rect")
                .attr("y", -6)
                .attr("height", height - margin.bottom);

            function brushed() {
                if (!brush.empty()) {
                    d3.select('.clear-brush').style("display", "inline-block");
                    d3.select('.brush-info')[0][0].innerText = brush.extent();
                }
            }

            d3.select('.clear-brush').on("click", function(d) {
                if (!brush.empty()) {
                    d3.selectAll("g.brush").call(brush.clear());
                    d3.select('.brush-info')[0][0].innerText = "";
                    d3.select('.clear-brush').style("display", "none");
                }
            })
    }
})();
