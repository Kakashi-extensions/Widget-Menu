/* jshint esnext:true */
/*
 *
 *  Weather extension for GNOME Shell
 *  - Displays a small weather information on the top panel.
 *  - On click, gives a popup with details about the weather.
 *
 * Copyright (C) 2011 - 2013
 *     ecyrbe <ecyrbe+spam@gmail.com>,
 *     Timur Kristof <venemo@msn.com>,
 *     Elad Alfassa <elad@fedoraproject.org>,
 *     Simon Legner <Simon.Legner@gmail.com>,
 *     Christian METZLER <neroth@xeked.com>,
 *     Mark Benjamin weather.gnome.Markie1@dfgh.net,
 *     Mattia Meneguzzo odysseus@fedoraproject.org,
 *     Meng Zhuo <mengzhuo1203+spam@gmail.com>,
 *     Jens Lody <jens@jenslody.de>
 * Copyright (C) 2014 -2015
 *     Jens Lody <jens@jenslody.de>,
 *
 *
 * This file is part of gnome-shell-extension-openweather.
 *
 * gnome-shell-extension-openweather is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * gnome-shell-extension-openweather is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell-extension-openweather.  If not, see <http://www.gnu.org/licenses/>.
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



const WeatherWidget = new Lang.Class({
    Name: "WeatherWidget",

    _init: function(params) {
        this.params = Params.parse(params, {
            calc_app: false,
        });

        this.weather = new St.BoxLayout({
            style_class: 'Calendar-group',

            //x_align: St.Align.MIDDLE
            vertical: true
        });

        this._Weather();

    },


        _Weather: function(){

          this._weatherWidget = new St.BoxLayout

          this._sue = new Me.imports.bob.OpenweatherMenuButton();


            this._weatherWidget.add(this._sue._currentWeather, {expand: true, x_fill: false, x_align: St.Align.MIDDLE});

            this.weather.add(this._weatherWidget, {expand: true, x_fill: false, x_align: St.Align.MIDDLE})
},



destroy: function(){
    this.today.destroy();
}


        });
