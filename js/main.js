var Autocomplite = function (node) {
    var hidden = document.createElement('INPUT');
    var widget = $(node);

    this.dom = {
        widget: widget,
        input: widget.find('.input'),
        hidden: $(hidden)
    };

    this.sudgest = widget.data('values');

    this.__init__();
    this.__bind__();
};


Autocomplite.prototype.__init__ = function () {
    this.dom.hidden.attr('type', 'hidden');
    this.dom.hidden.attr('name', this.dom.input.attr('name'));
    this.dom.input.attr('name', '');

    for(var i = 0; i < this.sudgest.length; i++){
        if(this.sudgest[i].checked){
            this.dom.hidden.val(this.sudgest[i].key);
            this.dom.input.val(this.sudgest[i].value);
        }
    }
};


Autocomplite.prototype.__bind__ = function () {
    this.dom.widget.on('mouseenter', '.input-autocomplite__suggest div', $.proxy(this.__event_mouseenter__, this));
    this.dom.widget.on('click', '.input-autocomplite__suggest div', $.proxy(this.__event_mouseclick__, this));
    this.dom.input.on('focus', $.proxy(this.__event_focus__, this));
    this.dom.input.on('input', $.proxy(this.__event_focus__, this));
    $(document).on('mouseup', $.proxy(this.__global_click__, this));
    this.dom.input.on('keydown', $.proxy(this.__event_keydown__, this));
};


Autocomplite.prototype.__event_focus__ = function () {
    this.dom.widget.find('.input-autocomplite__suggest').remove();
    this.dom.widget.append(this.__create_suggest__(this.dom.input.val()));
};


Autocomplite.prototype.__global_click__ = function (event) {
    var self = $(event.target);

    if(!self.closest('.input-autocomplite').length){
        $('.input-autocomplite__suggest').remove();
    };
};


Autocomplite.prototype.__create_suggest__ = function (string) {
    var result = ['<div class="input-autocomplite__suggest">'];
    for(var i = 0; i < this.sudgest.length; i++){
        if(this.sudgest[i].value.indexOf(string) < 0){
            continue;
        }
        result.push('<div data-key="'+this.sudgest[i].key+'">'+this.sudgest[i].value+'</div>');
    }
    result.push('</div>');

    return  result.join('');
};


Autocomplite.prototype.__event_mouseenter__ = function (event) {
    this.dom.widget.find('.input-autocomplite__suggest div').removeClass('active');
    $(event.currentTarget).addClass('active');
};


Autocomplite.prototype.__event_mouseclick__ = function (event) {
    var self = $(event.currentTarget);
    this.dom.widget.find('.input-autocomplite__suggest').remove();
    this.change(self.data('key'), self.text());
};


Autocomplite.prototype.change = function (key, value) {
    this.dom.hidden.val(key);
    this.dom.input.val(value);

};


$('.input-autocomplite').each(function () {new Autocomplite(this);});


$('.switcher__button').on('click', function () {
    $(this).parents('.switcher').first().toggleClass('switcher_open');
});


var BoolInput = function (node) {
    var widget = $(node);

    this.dom = {
        widget: widget,
        input: widget.find('input')
    };

    this.__init__();
    this.__bind__();
};


BoolInput.prototype.__init__ = function () {
    this.dom.input.hide();
    this.dom.widget.append([
        '<span class="input-bool__canvas">',
            '<span class="input-bool__yes">Да</span>',
            '<i class="input-bool__circle"></i>',
            '<span class="input-bool__no">Нет</span>',
        '</span>'
    ].join(''));

    this.__change_status__();
    this.__event_change__();
};


BoolInput.prototype.__bind__ = function () {
    this.dom.input.on('change', $.proxy(this.__event_change__, this));
};


BoolInput.prototype.__event_change__ = function () {
    if(this.dom.input.is(':disabled')){
        this.dom.widget.addClass('input-bool_disabled');
    }else{
        this.__change_status__();
    }
};


BoolInput.prototype.__change_status__ = function () {
    if(this.dom.input.is(':checked')){
        this.dom.widget.addClass('input-bool_checked');
    }else{
        this.dom.widget.removeClass('input-bool_checked');
    }
};


$('.input-bool').each(function () {
    new BoolInput(this);
});


$('.input-check input').on('change', function () {
    var box = $(this).parents('.input-check').first();
    if($(this).is(':checked')){
        box.addClass('input-check_active');
        $('[name='+this.name+']').not(this).trigger('change');
    }else{
        box.removeClass('input-check_active');
    }
});


var Dropdown = function (node) {
    var widget = $(node);
};


$('.dropdown').each(function () {
    new Dropdown(this);
});


$('.input_date').each(function () {
    this.__pukaday__ = new Pikaday({
        field: this,
        format: 'DD.MM.YY',
        onSelect: function (date) {
            var date = new Date(date);
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getYear();
            [day, month, year].join('.');
        },
        i18n: {
            previousMonth : 'Предыдущий месяц',
            nextMonth     : 'Следующий месяц',
            months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            weekdays      : ['Понедельник','Вторник','Среда','Четверг','Пятница','Субота','Воскресенье'],
            weekdaysShort : ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
        }
    });
});

// From nalog.ru


/*------------------------ Spoiler  -----------------------------*/

(function ($)
{
    $.fn.Spoiler = function (options)
    {
        var params = {
            show: "&#1055;&#1086;&#1082;&#1072;&#1079;&#1072;&#1090;&#1100;&#32;&#1087;&#1086;&#1076;&#1088;&#1086;&#1073;&#1085;&#1086;&#1089;&#1090;&#1080;",
            hide: "&#1057;&#1082;&#1088;&#1099;&#1090;&#1100;&#32;&#1087;&#1086;&#1076;&#1088;&#1086;&#1073;&#1085;&#1086;&#1089;&#1090;&#1080;"
        }

        if (options)
        {
            $.extend(params, options);
        }

        $(this).each(function (index, element)
        {
            var o = $(element);
            o.hide();

            var rnd = (new Date()).getMilliseconds() + "_" + Math.floor(Math.random() * (999999));

            var todo = o.hasClass("open") ? "hide" : "show";

            var onclickf = function ()
            {
                switchSpoiler(o.hasClass("open") ? "show" : "hide");
                return false;
            };

            var switchSpoiler = function (todo)
            {
                if (todo == 'hide')
                {
                    $("#spoiler_" + rnd).show();
                    o.addClass("open");

                    $(".spoiler_btn_" + rnd).first().addClass("hide_more");
                    $(".spoiler_btn_" + rnd).first().removeClass("show_more");
                } else
                {
                    $("#spoiler_" + rnd).hide();
                    o.removeClass("open");
                    $(".spoiler_btn_" + rnd).first().removeClass("hide_more");
                    $(".spoiler_btn_" + rnd).first().addClass("show_more");
                }

                $(".spoiler_btn_" + rnd).html(params[todo]);
            };

            if (o.parent().hasClass("with_icon"))
            {
                if (o.find(".dl_item").length > 0)
                {
                    o.parent().after("<div id=\"spoiler_" + rnd + "\" class=\"download div_more_download\">" + o.html() + "<div class=\"clear\"><br></div><a href=\"\" class=\"hide_more bigger spoiler_btn_" + rnd + "\">" + params[todo] + "</a><div class=\"clear\"></div></div>");
                } else
                {
                    o.parent().after("<div id=\"spoiler_" + rnd + "\" class=\"div_more\">" + o.html() + "<div class=\"clear\"><br></div><a href=\"\" class=\"hide_more  spoiler_btn_" + rnd + "\">" + params[todo] + "</a><div class=\"clear\"></div></div>");
                }

                o.after('<a href="" class="hide_more spoiler_btn_' + rnd + '">' + params[todo] + '</a>');


            } else
            {
                o.after("<div style='clear:both;'></div><div style=\"margin-top:10px;\" id=\"spoiler_" + rnd + "\" class=\"div_more\">" + o.html() + "<div class=\"clear\"><br></div><a href=\"\" class=\"hide_more  spoiler_btn_" + rnd + "\">" + params[todo] + "</a><div class=\"clear\"></div></div>");
                o.after('<a href="" class="hide_more spoiler_btn_' + rnd + '">' + params[todo] + '</a>');
            }
            $(".spoiler_btn_" + rnd).click(onclickf);
            switchSpoiler(todo);
        });
        return this;
    };
})(jQuery);

$(function(){
    // $(".sp").Spoiler({});
});