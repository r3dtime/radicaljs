/*! radical v1.0.1 | (c) ruslan Ismailov r3d_time@hotmail.com | api1.net/license/ */
$.fn.sendform = function(s) {
	s = s.split(',');
	var obj = {};
	for (var i = 0; i < s.length; i++) {
		obj[s[i]] = $('#' + s[i]).val()
	}
	$('.loading').fadeIn(200);
	$.ajax({
		type: "POST",
		url: 'listen.php',
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			$('.loading').fadeOut(200);
			if (data.run) {
				radical.s2rools(document, data.run)
			} else {
				radical.s2rools(document, 'fadeIn@.modalbg>fast;text@.modal p>Network error!')
			}
		},
		failure: function(errMsg) {
			console.log(errMsg);
			$('.loading').fadeOut(500)
		}
	})
}
$.fn.setpage = function(s) {
	s = s.split('!');
	var dest = this.attr(s[0]);
	$(s[1]).hide();
	$(dest).show()
};
$.fn.ifthisval = function(s) {
	s = s.split('!');
	if (this.val().trim() === s[0].trim()) {
		radical.s2rools(document, $('[' + s[1] + ']').attr(s[1]))
	}
}
$.fn.selectonmap = function(s) {}
$.fn.setattr = function(s) {
	s = s.split(',');
	this.attr(s[0], s[1])
}
$.fn.func = function(s) {
	eval(s)
}
$.fn.fromattr = function(s) {
	radical.s2rools(this, this.attr(s))
}
$.fn.irselect = function(s) {
	var values = eval(this.attr('values'));
	var current = this.attr('current');
	var afterselect = this.attr('afterselect');
	var html = '';
	for (var i = 0; i < values.length; i++) {
		html = html + '<li class="item' + (values[i][0] === current ? ' current' : '') + '"  dataid="' + values[i][0] + '">' + values[i][1] + '</li>'
	}
	var input = this;
	var selectbg = $('.selectbg');
	var selectlist = $('.selectlist');
	selectlist.html(html);
	selectbg.fadeIn(200, function() {
		selectlist.find('li').click(function(e) {
			input.attr('current', $(e.target).attr('dataid'));
			input.val($(e.target).text());
			selectbg.fadeOut(200, function() {
				if (afterselect && afterselect !== '') {
					radical.s2rools(input, afterselect)
				}
			})
		})
	})
}
$.fn.loadsrc = function(url) {
	url = url.split(',');
	if ($.inArray(url[0], radical.js) == -1) {
		$.ajax({
			url: 'src/js/extra/' + url[0] + '.js',
			dataType: 'script',
			success: function() {
				radical.js[radical.js.length] = url[0];
				eval(url[1])
			},
			async: !0
		})
	}
}
$.fn.setcontentfrom = function(selector) {
	selector = selector.split('!');
	if (selector.length == 2) {
		$(selector[1]).html($(this.attr(selector[0])).html());
		radical.init(selector[1])
	} else {
		this.html($(selector[0]).html());
		radical.init(this)
	}
};
$.fn.setcontent = function(selector) {
	selector = selector.split('!');
	if (selector.length == 2) {
		$(selector[1]).html($(selector[0]).html());
		radical.init(selector[1])
	}
};
$.fn.textto = function(selector) {
	$(selector).text(this.text())
};
$.fn.wait = function(milsec, e, action) {
	setTimeout(function() {
		radical.s2rools(e, action)
	}, parseInt(milsec))
};
$.fn.val2var = function(selector) {
	document[selector] = $(this).val()
};
$.fn.goto = function(selector) {
	document.location.href = selector
};
$.fn.redirect = function(selector) {
	selector = selector.split('?');
	if (selector.length == 2) {
		selector[1] = selector[1].split('=');
		var keys = selector[1][0].split(',');
		var vals = selector[1][1].split(',');
		for (var i = 0; i < vals.length; i++) {
			vals[i] = keys[i] + '=' + encodeURIComponent(document[vals[i]])
		}
		selector = selector[0] + '?' + vals.join('&');
		document.location.href = selector
	} else {
		document.location.href = selector
	}
};
$.fn.postjs = function(selector) {
	selector = selector.split('?');
	if (selector.length == 2) {
		$('.loading').fadeIn(200);
		selector[1] = selector[1].split('=');
		var keys = selector[1][0].split(',');
		var vals = selector[1][1].split(',');
		var obj = {};
		for (var i = 0; i < vals.length; i++) {
			obj[keys[i]] = document[vals[i]]
		}
		$.ajax({
			type: "POST",
			url: selector[0],
			data: JSON.stringify(obj),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				$('.loading').fadeOut(200);
				if (data.run) {
					radical.s2rools(document, data.run)
				} else {
					radical.s2rools(document, 'fadeIn@.modalbg>fast;text@.modal p>Network error!')
				}
			},
			failure: function(errMsg) {
				$('.loading').fadeOut(500)
			}
		})
	}
};
$.fn.validate = function(s) {
	if (s === 'word') {
		this.val(this.val().replace(/[^a-z]+/gi, ""))
	} else if (s === 'digits') {
		this.val(this.val().replace(/[^0-9]+/gi, ""))
	}
};
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.substr(position, searchString.length) === searchString
	}
}
if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		'use strict';
		if (typeof start !== 'number') {
			start = 0
		}
		if (start + search.length > this.length) {
			return !1
		} else {
			return this.indexOf(search, start) !== -1
		}
	}
}
var radical = {
	page: 'home',
	params: {},
	js: [],
	req: function(a) {
		if (a[0] === radical.page && a.length == 2) {
			$(a[1]).click()
		}
	},
	proc: function(p, a) {},
	data: {},
	array: function(s) {
		s = s.split('>');
		s[1] = s[1].split(',');
		radical.data[s[0]] = s[1]
	},
	var :function(s) {
			s = s.split('>');
			s[1] = s[1].split(',');
			radical.data[s[0]] = s[1]
		}, s2rools2: function(e, s) {
			s = s.replace(/\n/g, "").replace(/\t+/g, "").replace(/\s+/g, ' ').trim();
			s = s.split(';');
			for (var i = 0; i < s.length; i++) {
				s[i] = s[i].split('>');
				if (s[i][0].includes('@')) {
					s[i][0] = s[i][0].split('@');
					if (s[i][1].includes('this.')) {
						s[i][1] = s[i][1].split('.');
						s[i][1] = $(e)[s[i][1][1]]()
					}
					if (s[i][0][1] === 'this') {
						$(e)[s[i][0][0]](s[i][1])
					} else {
						$(s[i][0][1])[s[i][0][0]](s[i][1])
					}
				} else {
					var fn = window[s[i][0]];
					if (typeof fn === 'function') {
						fn(s[i][1])
					}
				}
			}
		}, s2rools: function(e, s) {
			s = s.replace(/\n/g, "").replace(/\t+/g, "").replace(/\s+/g, ' ').trim();
			if (s.includes(' then ')) {
				d = s.split(' then ');
				d[0] = d[0].split('@');
				$(e)[d[0][0]](d[0][1], e, d[1])
			} else {
				s = s.split(';');
				for (var i = 0; i < s.length; i++) {
					if (s[i].startsWith('@')) {
						radical.run(e, s[i])
					} else {
						s[i] = s[i].split('>');
						if (s[i][0].includes('@')) {
							s[i][0] = s[i][0].split('@');
							if (s[i][1].includes('this.')) {
								s[i][1] = s[i][1].split('.');
								s[i][1] = $(e)[s[i][1][1]]()
							}
							if (s[i][0][1] === 'this') {
								$(e)[s[i][0][0]](s[i][1])
							} else {
								$(s[i][0][1])[s[i][0][0]](s[i][1])
							}
						} else {
							var fn = window[s[i][0]];
							if (typeof fn === 'function') {
								fn(s[i][1])
							}
						}
					}
				}
			}
		}, run: function(e, a) {
			if (a.startsWith('@')) {
				a = a.replace('@', '');
				a = $('[' + a + ']').attr(a)
			}
			radical.s2rools(e, a)
		}, init: function(root) {
			var ls = ['bind', 'change', 'click', 'focus', 'focusin', 'focusout', 'hover', 'keydown', 'keypress', 'keyup', 'load', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'on', 'ready', 'resize', 'select', 'submit'];
			for (var i = 0; i < ls.length; i++)
			$(root).find('[' + ls[i] + ']').each(function(ind, ele) {
				var me = $(ele);
				var at = me.attr(ls[i]);
				$(me)[ls[i]](function() {
					radical.run(me, at)
				})
			})
		}
};
$(document).ready(() = > {
	radical.init(document)
})