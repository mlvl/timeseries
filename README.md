Timeseries
==========
#### A D3.js timeseries.

![ScreenShot](/images/timeseries.png)

Quickly and easily display temporal data. Filter using the optional brush. Check out the [live demo](http://mlvl.github.io/timeseries) with documentation!

##### Usage

1. Get the source code
2. Put it in your project's directory
3. Include it in your index.html (or similar) ```<script src="<path to>\timeseries\timeseries.js"></script>```
4. Include default styles if desired ```<link rel="stylesheet" href="<path to>\timeseries\style.css" />```
5. Add a DOM container ```<div class="timeseries"></div>```
6. Create it!

```JavaScript
      <script>
        window.onload = function() {
          var domEl = 'timeseries';
          var data = [{'value': 1380854103662},{'value': 1363641921283}];
          var brushEnabled = true;
          timeseries(domEl, data, brushEnabled);
        }
      </script>
```
