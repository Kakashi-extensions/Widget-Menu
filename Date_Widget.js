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



const DateWidget = new Lang.Class({
    Name: "DateWidget",

    _init: function(params) {
        this.params = Params.parse(params, {
            calc_app: false,
        });

        this.today = new St.BoxLayout({
            style_class: 'Calendar-group',

            //x_align: St.Align.MIDDLE
            vertical: true
        });

        this._Date();

    },


        _Date: function(){

            this._date = new St.BoxLayout({
                style_class: 'date-widget',

                x_align: St.Align.MIDDLE,
                vertical: true,
                visible: true
            });

            this._dayLabel = new St.Label({

              style_class: 'day-label',


            });

            this._date.add(this._dayLabel, {
                expand: true,
                x_align: St.Align.MIDDLE,

            });

            this._dateLabel = new St.Label({
              style_class: 'date-label'
            });


            this._date.add(this._dateLabel, {
                expand: true,
                x_align: St.Align.MIDDLE,

            });

            date = new Date();

            this._dayLabel.set_text(date.toLocaleFormat('%A'));

            let dateFormat = Shell.util_translate_time_string (N_("%B %e %Y"));
            this._dateLabel.set_text(date.toLocaleFormat(dateFormat));

            this.today.add(this._date, {expand: true, x_fill: false, x_align: St.Align.MIDDLE});

},



destroy: function(){
    this.today.destroy();
}


        });


//Signals.addSignalMethods(CalculusHistory.prototype);
