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



const PlayerWidget = new Lang.Class({
   Name: "PlayerWidget",

   _init: function(params) {
       this.params = Params.parse(params, {
           calc_app: false,
       });

       this._player = new St.BoxLayout({
           style_class: 'Calendar-group',
           vertical: true
       });

       this._PlayerWidget();

   },


       _PlayerWidget: function(){

          this.coverArt = new Me.imports.ui.PlayerUI();

          this._player.add(this.coverArt.trackCover);

},



destroy: function(){
   this._player.destroy();
}


       });
