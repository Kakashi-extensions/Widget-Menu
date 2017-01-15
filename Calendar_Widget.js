/*
 *    Copyright (C) 2014  Kaer
 *
 *    This program is free software; you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation; either version 2 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License along
 *    with this program; if not, write to the Free Software Foundation, Inc.,
 *    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 *
 *    Modern Calc, Kaer (C) 2014-2015 Kaer
 *    Modern Calc comes with ABSOLUTELY NO WARRANTY.
 *
 *    Author: Kaer (the.thin.king.way+2014@gmail.com)
 *    Project url: https://github.com/kaer/gnome-shell-extension-modern-calc
 *
 */

 const Clutter = imports.gi.Clutter;
 const ExtensionUtils = imports.misc.extensionUtils;
 const Gio = imports.gi.Gio;
 const GLib = imports.gi.GLib;
 const Lang = imports.lang;
 const Main = imports.ui.main;
 const Mainloop = imports.mainloop;
 const Panel = imports.ui.panel;
 const Pango = imports.gi.Pango;
 const Params = imports.misc.params;
 const Shell = imports.gi.Shell;
 const St = imports.gi.St;
 const Tweener = imports.ui.tweener;
 const PopupMenu = imports.ui.popupMenu;
 const PanelMenu = imports.ui.panelMenu;
 const Calendar = imports.ui.calendar;
 const Gtk = imports.gi.Gtk;
 const GObject = imports.gi.GObject;
 const Atk = imports.gi.Atk;
 const GWeather = imports.gi.GWeather;


 const Cairo = imports.cairo;
 const GnomeDesktop = imports.gi.GnomeDesktop;

 const Me = ExtensionUtils.getCurrentExtension();
 const ModernCalcModule = Me.imports.modern_calc_module;
 const Utils = Me.imports.utils;
 const Util = imports.misc.util;
 const GnomeSession = imports.misc.gnomeSession;

 //const Gettext = imports.gettext.domain('modern-calc');
 //const _ = Gettext.gettext;

 const Qty = Me.imports.module_data.unit_converter.quantities15;
 const MeasurementList = Me.imports.module_data.unit_converter.measurement_list;
 const UnitTranslation = Me.imports.module_data.libs.unit_translation;

 const TranslateExpression = UnitTranslation.translate;
//const Me = ExtensionUtils.getCurrentExtension();

const Gettext = imports.gettext.domain('modern-calc');
const _ = Gettext.gettext;

function _isToday(date) {
    let now = new Date();
    return now.getYear() == date.getYear() &&
         now.getMonth() == date.getMonth() &&
         now.getDate() == date.getDate();
}

const TodayButton = new Lang.Class({
    Name: 'TodayButton',

    _init: function(calendar) {
        // Having the ability to go to the current date if the user is already
        // on the current date can be confusing. So don't make the button reactive
        // until the selected date changes.




        this.actor = new St.Button({ style_class: 'datemenu-today-button',
                                     x_align: St.Align.START,
                                     can_focus: true,
                                     reactive: false
                                   });
        this.actor.connect('clicked', Lang.bind(this,
            function() {
                this._calendar.setDate(new Date(), false);
            }));

        let hbox = new St.BoxLayout({ vertical: true });
        this.actor.add_actor(hbox);

        this._dayLabel = new St.Label({ style_class: 'day-label',
                                        x_align: Clutter.ActorAlign.START });
        hbox.add_actor(this._dayLabel);

        this._dateLabel = new St.Label({ style_class: 'date-label' });
        hbox.add_actor(this._dateLabel);

        this._calendar = calendar;
        this._calendar.connect('selected-date-changed', Lang.bind(this,
            function(calendar, date) {
                // Make the button reactive only if the selected date is not the
                // current date.
                this.actor.reactive = !_isToday(date)
            }));
    },


    setDate: function(date) {
        this._dayLabel.set_text(date.toLocaleFormat('%A'));

        /* Translators: This is the date format to use when the calendar popup is
         * shown - it is shown just below the time in the shell (e.g. "Tue 9:29 AM").
         */
      let dateFormat = Shell.util_translate_time_string (N_("%B %e %Y"));
       this._dateLabel.set_text(date.toLocaleFormat(dateFormat));

        /* Translators: This is the accessible name of the date button shown
         * below the time in the shell; it should combine the weekday and the
         * date, e.g. "Tuesday February 17 2015".
         */
     let dateFormat = Shell.util_translate_time_string (N_("%A %B %e %Y"));
        this.actor.accessible_name = date.toLocaleFormat(dateFormat);
    }
});




const CalendarWidget = new Lang.Class({
    Name: "CalendarWidget",

    _init: function(params) {
        this.params = Params.parse(params, {
            calc_app: false,
        });

        this.cal = new St.BoxLayout({
            style_class: 'bob-calendar',
            vertical: true
        });

        this._Calendar();

    },

        _Calendar: function(){

            this._box = new St.BoxLayout({
              style_class: 'box-calendar',
                vertical: true,
                visible: true
            });



           //let layout = new imports.ui.dateMenu.FreezableBinLayout();

           this._bin = new St.BoxLayout({
             style_class: 'bin-box',
             vertical: true,
             //layout_manager: layout
            });

           this._box.add(this._bin);

           this._hbox = new St.BoxLayout({ style_class: 'hbox' });

           this._bin.add(this._hbox);

           this._calendar = new imports.ui.calendar.Calendar();
           this._calendar.connect('selected-date-changed',Lang.bind(this,

          function(calendar, date) {
            layout.frozen = !_isToday(date);
          //this._messageList.setDate(date);
            }));

            date = new Date();

          /*  this.menu.connect('open-state-changed', Lang.bind(this, function(menu, isOpen) {
            // Whenever the menu is opened, select today
            if (isOpen) {
                let now = new Date();
                this._calendar.setDate(now);
                this._date.setDate(now);
                this._messageList.setDate(now);
            } */

            let now = new Date();
            this._calendar.setDate(now);





           this._vbox = new St.BoxLayout({
             style_class: 'jill-calendar',
             vertical: true,


           });



           this._hbox.add(this._vbox,{
             expand: true,
             vertical: true,

           });


           this._vbox.add(this._calendar.actor,{
             expand: true,
             vertical: true,

           });








           this.cal.add(this._box,{
             expand: true,
             vertical: true,

           });



        },

        destroy: function(){
          this.cal.destroy();
        }


      });


//Signals.addSignalMethods(CalculusHistory.prototype);
