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

const Gettext = imports.gettext.domain('modern-calc');
const _ = Gettext.gettext;

const Qty = Me.imports.module_data.unit_converter.quantities15;
const MeasurementList = Me.imports.module_data.unit_converter.measurement_list;
const UnitTranslation = Me.imports.module_data.libs.unit_translation;

const TranslateExpression = UnitTranslation.translate;

const PAGES = {
    CONVERSION: 'conversion-page',
    MEASUREMENT_CHOOSER: 'measurement-chooser-page'
};


function _isToday(date) {
    let now = new Date();
    return now.getYear() == date.getYear() &&
           now.getMonth() == date.getMonth() &&
           now.getDate() == date.getDate();
}

/*const TodayButton = new Lang.Class({
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


});*/



/*
} */



const UnitConverterModule = new Lang.Class({
    Name: "UnitConverterModule",
    Extends: ModernCalcModule.ModernCalcModule,

    _init: function(params) {

        this.params = Params.parse(params, {
            app: false
        });

        let parentParams = {
            app: this.params.app,
            style_class: 'unit-converter-module',
            module_name: 'unit_converter',
            toolbar_button_label: _("Notifications")
        };



        this.parent(parentParams);

        this._activePage = null;
        this._showPage(PAGES.MEASUREMENT_CHOOSER);
    },

    _prepareInterface: function(){


        this._initNotifications();

        this.actor.add(this._notifications, {
            expand: true,
            x_align: St.Align.MIDDLE,
            y_align: St.Align.START
        });

    },


    _initNotifications: function(){

        this._notifications = new St.BoxLayout({
            style_class: 'measurement-chooser-page',
            vertical: true,
            visible: false
        });

      this.notify = new imports.ui.calendar.CalendarMessageList();




      this._notifications.add(this.notify.actor,
      {
        expand: false,
        x_align: St.Align.MIDDLE,
        y_align: St.Align.START

      });





    },









    _showPage: function(page_name){



                this._notifications.visible = true;


                this._activePage = page_name;

    },





    on_activate: function(){
        // set focus
        if(this._activePage !== null){
            if(this._activePage == PAGES.MEASUREMENT_CHOOSER){
                this._measurementFilterEntry.grab_key_focus();
            } else if(this._activePage == PAGES.CONVERSION){
                this._expressionEntry.grab_key_focus();
            }

        }

        this.parent();
    },

    on_deactivate: function(){
        this.parent();
    },

    on_key_press_event: function(o, e){
        let modifierState = e.get_state();
        let symbol = e.get_key_symbol();
        let keyCode = e.get_key_code();

        // CTRL
        if(modifierState == Clutter.ModifierType.CONTROL_MASK){

            // CTRL+Space Clear entries
            if(symbol === Clutter.KEY_space){

                if(this._activePage == PAGES.MEASUREMENT_CHOOSER){
                    this._clearMeasurementFilter();
                } else if(this._activePage == PAGES.CONVERSION){
                    this._clearExpression();
                }

            }
            // CTRL+M Show measurement chooser
            else if(keyCode == 58){
                this._showPage(PAGES.MEASUREMENT_CHOOSER);
            }
        }
        // CTRL+Shift
        else if(modifierState == Clutter.ModifierType.CONTROL_MASK + Clutter.ModifierType.SHIFT_MASK){

            // CTRL+Shift+C Copy main result
            if(keyCode == 54){
                this._copyMainResult();
            }
        }

    },

    destroy: function(){
        this._measurementList = null;
        this._extraConvList = null;
        this._measurementListButton = null;
        this._availableUnitsInfoBox = null;

        this.parent();
    },

});
