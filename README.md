Timeseries
==========
#### A D3.js timeseries.

![ScreenShot](/images/timeseries.png)

Quickly and easily display temporal data. Filter using the optional brush. Check out the [live demo](http://mlvl.github.io/timeseries) with documentation!

##### Usage

- Get the source code
- Put it in your project's directory
- Include it in your index.html (or similar) 
```JavaScript
<script src="<path to>\timeseries\timeseries.js"></script>
```
- Include default styles if desired 
```JavaScript
<link rel="stylesheet" href="<path to>\timeseries\style.css" />
```
- Add a DOM container 
```JavaScript
<div class="timeseries"></div>
```
- Create it!

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
