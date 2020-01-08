
import * as d3 from 'd3'

export default class stackedBarChart {
    

    constructor(node, data) {
	console.debug(node);
	this.node=node;
	this.data=data;
	console.debug("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", data, data[data.length-1][Object.keys(data[data.length-1])[0]][0])
	this.selectedData(data[data.length-1][Object.keys(data[data.length-1])[0]][0])
	this.marginBottom=40;
        this.marginTop=25;
	this.maxValue=this.calcMaxValue(data);
	this.minValue=this.calcMinValue(data);
	this.extentPercent = 0.05
	this.extentMarginOfError = 0.10
	this.maxExtentLineY= 20
	this._colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];
	this._height=(node.clientHeight > 0) ? node.clientHeight : 400
	console.debug("**********************************************", this._height);
	this._width=(node.clientWidth <= 0) ? 300 : node.clientWidth
	this.xScale = d3.scaleBand()
	    .domain(this.data.map(d => {
		return Object.keys(d)[0]
	    }))
	    .range([0, this._width])
	    .paddingInner(0.3)
	    .paddingOuter(0.1)

	
	this.yScale = d3.scaleLinear().rangeRound([this.marginTop, this._height - this.marginBottom])
	this.yScale.domain([this.maxValue, 0])

	this.maxBarSize = undefined;
    if (this.maxBarSize) {
      this.barOffsetX = (this.xScale.bandwidth() > this.maxBarSize) ? (this.xScale.bandwidth() - this.maxBarSize) / 2 : 0
      this.maxBarSize = d3.min([this.xScale.bandwidth(), this.maxBarSize])
    } else {
      this.maxBarSize = this.xScale.bandwidth()
    }
	this.chart=d3.select( this.node.children[0]).append('svg')
	.attr('height', this._height)
	.attr('width', this._width)
    console.debug("CHART ____",this.chart);
        console.debug("CHART C____",this.node.children[0]);
}

    colors(value) {
	if(value) {
	    this._colors=value
	}
	return this._colors
    }
    
    selectedData(value) {
	if(value) {
	    this._selectedData=value
	}
	return this._selectedData
    }
    height(value) {
	if(value) {
	    this._height=value
	    this.chart.attr('height', value);
	}
	return this._height
    }
    width(value) {
	if(value) {
	    this._width=value
	    this.chart.attr('width', value);
	}
	return this._width;
    }

    calcMaxValue(data) {
	return d3.max(data, d => {
	    let sum = 0
	    Object.entries(d).forEach(
		([key, values]) => {
		    Object.entries(values[0]).forEach(
			([key, value]) => {
			    sum += value
			}
		    )
		}
	    )
	    return (sum)
	})
    }
    calcMinValue (data) {
	return d3.min(data, d => {
	    let data = 0
	    Object.entries(d).forEach(
		([key, values]) => {
		    Object.entries(values[0]).forEach(
			([key, value]) => {
			    data += value
			}
		    )
		}
	    )
	    return (data)
	})
    }

    getOrderedKeys (data) {
	return Object.keys((data[0][Object.keys(data[0])[0]])[0])
    }

    toggleSelectedBar = (element, data, callBack) => {
	let selectedElement = element.parentNode.querySelector('[selected=true]')
	console.debug("Selected =======================================", data);
	console.debug("All data --------------------------------------", this.data);
	if (selectedElement) {
  	    selectedElement.removeAttribute('selected')
	}

	element.setAttribute('selected', true)
	element.setAttribute('tabindex',1)
	this.selectedData(data[0].data);
	this.draw()
	if (callBack) {
  	    callBack(data)
	}
    }
    
    onSelect(d) {
	console.debug("Selected =======================================", d);
	
    }
    
    addChart(data) {
	if(data) {
	    this.data=data
	}
	let self = this;
	let stack = d3.stack()
	    .keys(this.getOrderedKeys(data))
	    .offset(d3.stackOffsetNone)
	let keys=this.getOrderedKeys(data);
	console.debug("KEEEEEEEY:", keys)
	this.chart.append('g').
	    attr('class', 'bars')
	    .selectAll('g')
	    .data(self.data)
	    .enter().append('g')
	    .attr('height', (self._height - self.marginTop))
	    .attr('width', self.xScale.bandwidth())
	    .attr('transform', d => 'translate(' + (self.xScale(Object.keys(d)[0])) + ',0)')
	    //.attr('selected', (d,i) => i === this.selected())
	    .attr('class', 'stacked-bar-chart-bar')
	    .attr('data-key', d => Object.keys(d)[0])
	    .attr('tabindex',0)
	    .selectAll('g')
	    .data(d => {
		let s=stack(d[Object.keys(d)[0]])
		return stack(d[Object.keys(d)[0]])
	    })
	    .enter().append('g')
	//	    .attr('class', d => self.styleMap && self.styleMap[d.key])
	    .attr('class', (d,i) => 'stacked-bar-chart-'+i)
            .attr('fill-opacity',(d,i) => (1-(i/keys.length)))
	    .append('rect')
	    .attr('y', d => {
		return self.yScale(d[0][1]) || 0
	    })
	    .attr('height', function (d) {
		return (self.yScale(d[0][0]) - self.yScale(d[0][1])) || 0
	    })
	    .attr('width', self.maxBarSize)
	    .attr('x', self.barOffsetX)
	    .on('click', function (d) {
		self.toggleSelectedBar(this, d, self.onSelect(d) )
	    })
    }

    draw() {
	if(this.data === undefined) {
	    return;

	}
	
	this.chart.selectAll('#backgroundRect').remove()
	this.addBackgroundRect()
	
	this.chart.selectAll('.maxExtent').remove()
	this.addMaxExtent()

	this.chart.selectAll('.bars').remove()
	this.addChart(this.data)
	
 	this.chart.selectAll('.x-axis').remove()
	this.addXAxis()
	
	// Add Grouping Lines
	this.chart.selectAll('.groups').remove()
	this.addGroupLines()


	this.addLegend()

    }
    
    addMaxExtent (units) {
	try {
	    let self = this
	    // Add Max Extent Number text
	    let maxExtentGroup = self.chart.append('g').attr('class', 'maxExtent')
	    let maxExtentValue = this.calculateExtentValue(this.maxValue)
	    if(!units) {
		units = ''
	    }
	    maxExtentGroup.append('text')
		.attr('width', self._width)
		.attr('x', self._width)
		.attr('y', (self.maxExtentLineY - 5))
		.attr('text-anchor', 'end')
		.text((units === 'dollars' || units === '$') ? ['$', maxExtentValue].join('') : [maxExtentValue, units].join(' '))
	    
	    maxExtentGroup.append('line')
		.attr('x1', 0)
		.attr('x2', self._width)
		.attr('stroke', '#a7bcc7')
		.attr('stroke-dasharray', [5, 5])
		.attr('stroke-width', 1)
		.attr('transform', 'translate(' + [0, self.maxExtentLineY] + ')')
	} catch(e) { console.warn("Error in addMaxExtent", e) }
    }
    
    addXAxis (xLabels) {
	let self = this
	
	let createXAxis = () => (d3.axisBottom(self.xScale).tickSize(0).tickFormat(d =>
										   (xLabels) ? xLabels[d] : d))
	
	self.chart.append('g')
	    .attr('class', 'x-axis')
	    .attr('transform', 'translate(0,' + (self._height - self.marginBottom) + ')')
	    .call(createXAxis())
	    .selectAll('text')
	    .attr('y', 9)
    }

    addGroupLines () {
	if (this.groups) {
	    let self = this
	    
	    let groupLines = this.chart.append('g').attr('class', 'groups')
	    let groupItemWidth = (self._width / self.state.length)
	    let padding = (self.xScale.bandwidth() * 0.2)
	    let xPos = 0
	    
	    Object.keys(self.groups).map((name, index) => {
		let groupLineWidth = xPos + (groupItemWidth * self.groups[name].length) - padding
		
		groupLines.append('line')
		    .attr('x1', xPos + padding)
		    .attr('x2', groupLineWidth)
		    .attr('stroke', '#a7bcc7')
		    .attr('stroke-width', 1)
		    .attr('transform', 'translate(' + [0, self._height - 4 - self.marginBottom / 2] + ')')
		
		groupLines.append('text')
		    .attr('x', ((xPos + padding) / 2) + (groupLineWidth / 2))
		    .attr('y', self._height - 16)
		    .attr('text-anchor', 'middle')
		    .text(name)
		
		xPos = groupLineWidth + padding
	    }
					)
	}
    }

    addLegend() {
	let self=this;
	let labels=this.getOrderedKeys(this.data).reverse();
	let selectedData=this.selectedData()
	console.debug(this.legend);
	let legend=undefined;
	if(this.legend) {
	    
	    console.debug(this.legend.selectAll('.legend'));
	    this.legend.selectAll('.legend').remove()
	    legend=this.legend;
	} else {
	    console.debug("SELECTED------",selectedData);
	    legend=d3.select( this.node.children[1]).append("svg")
	    .attr("class", 'legend')
	    .attr("width",this._width)
	    .attr("height",this._height).selectAll(".legend")
	    .data(labels)
	    .enter().append("g")
	    .attr("class", "legend")

	}
	
	
	
	legend.append('line')
	    .attr("class", "legend")
	    .attr('x1', 0)
	    .attr('x2', this._width)
	    .attr('stroke', '#a7bcc7')
	    .attr('stroke-width', 1)
	    .attr('transform', 'translate(' + [0, this.maxExtentLineY] + ')')

	
	legend.append("rect")
	    .attr("class", "legend")
	
	    .attr("x", 0)
	    .attr("y",function(d, i) {return 20*(i+1)+5})
	    .attr("width", 10)
	    .attr("height", 10)
	    .style("fill-opacity", (d,i) => ((i+1)/labels.length))

	legend.append("text")
	    .attr("class", "legend")
	    .attr("x", 34)
	    .attr("y",function(d, i) {return 20*(i+1)+3})
	    .attr("dy","1em")
	    .style("text-anchor", "start")
	    .style("font-size", '11px')
	    .text(function(d, i) {console.debug(d); return d})

	legend.append("text")
	    .attr("class", "legend")
	    .attr("x",this._width-70)
	    .attr("y",function(d, i) {return 20*(i+1)+3})
	    .attr("dy","1em")
	    .style("text-anchor", "start")
	    .style("font-size", '11px')
		  .text(function(d, i) {return selectedData[d] || "error"})

	this.legend=legend;
	/*
	legend.append("text")
	    .attr("x", this._width + 5)
	    .attr("y", 9)
	    .attr("dy", ".35em")
	    .style("text-anchor", "start")
	    .text(function(d, i) { 
		switch (i) {
		case 0: return "Anjou pears";
		case 1: return "Naval oranges";
		case 2: return "McIntosh apples";
		case 3: return "Red Delicious apples";
		}
	    });
	*/
    }

    getMetricLongUnit (str) {
	let suffix = { k: 'k', M: ' million', G: ' billion' }
	
	return str.replace(/(\.0+)?([kMG])$/, function (_, zeroes, s) {
	    return suffix[s] || s
	})
    }
    
    calculateExtentValue (maxValue) {
  	let maxValueExtent = Math.ceil(maxValue * (1 + this.extentPercent))
  	return this.getMetricLongUnit(d3.format(this.setSigFigs(maxValue, maxValueExtent))(maxValueExtent))
    }
  
    crawlCeil(ymax, ceilMax, i) {
	// When ymax is a value less than 10, the ratio of ceilMax and ymax will never
	// be less than (1 + extentMarginOfError + extentPercent), and the function will continue
	// be called in its parent function's while loop.
	
	let sigFig = '.' + i + 's'
	
	/* var sigFigCeil = +eiti.format.transform(
	   sigFig,
	   eiti.format.siValue
	   )(ceilMax); */
	
	let sigFigCeil = siValue(d3.format(sigFig)(ceilMax))
	
	let ceilIsLargerThanValue = sigFigCeil > +ymax
	let ceilIsntTooBig = (sigFigCeil / +ymax) <= (1 + this.extentMarginOfError + this.extentPercent)
	if (!ceilIsntTooBig) {
	    ceilIsntTooBig = ((sigFigCeil - ymax) < 10) // Accomodate for small numbers if the difference is smal then this should be acceptable
	}
	let justRight = ceilIsLargerThanValue && ceilIsntTooBig
	return justRight ? sigFig : ''
    }
    
    setSigFigs(ymax, ceilMax) {
	let sigFigs = ''
	let SF = 0
	while (sigFigs.length < 3) {
	    SF++
	    sigFigs = this.crawlCeil(ymax, ceilMax, SF)
	}
	return sigFigs
    }
    
    addBackgroundRect () {
	this.chart.append('rect')
	    .attr('class','stacked-bar-chart-background')
	    .attr('id', 'backgroundRect')
	    .style('opacity', 0.0)
	    .attr('y', 0)
	    .attr('height', this._height)
	    .attr('width', this._width)
	    .attr('x', 0)
    }
    
}



