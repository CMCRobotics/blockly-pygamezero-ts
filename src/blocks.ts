import * as Blockly from 'blockly/core';
import { FieldColour } from '@blockly/field-colour';
import { FieldAngle } from '@blockly/field-angle';
import { PGZ_MSGS } from './msg';

const msg = (key: keyof typeof PGZ_MSGS): string => PGZ_MSGS[key];

export const defineBlocks = () => {
  Blockly.Blocks['draw_loop'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_DRAW LOOP"));
      this.appendStatementInput("STATEMENTS")
          .setCheck(null);
      this.setColour(120);
      this.setTooltip(msg("PGZ_MAIN PYGAMEZERO DRAW LOOP"));
    }
  };

  Blockly.Blocks['update_loop'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_UPDATE LOOP"));
      this.appendStatementInput("STATEMENTS")
          .setCheck(null);
      this.setColour(120);
      this.setTooltip(msg("PGZ_MAIN PYGAMEZERO UPDATE LOOP"));
    }
  };

  Blockly.Blocks['on_touch_event'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_WHEN THE TOUCH SCREEN IS "))
          .appendField(new Blockly.FieldDropdown([ [msg("PGZ_PRESSED"),"on_mouse_down"], [msg("PGZ_RELEASED"),"on_mouse_up"] ]), "EVENT");
      this.appendStatementInput("STATEMENTS")
          .setCheck(null);
      this.setColour(120);
      this.setTooltip(msg("PGZ_EXECUTES CODE WHEN THE TOUCHSCREEN IS PRESSED OR RELEASED"));
    }
  };

  Blockly.Blocks['on_drag_event'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_WHEN THE TOUCH SCREEN IS DRAGGED"));
      this.appendStatementInput("STATEMENTS")
          .setCheck(null);
      this.setColour(120);
      this.setTooltip(msg("PGZ_EXECUTES CODE WHEN A FINGER IS DRAGGED ACROSS THE TOUCHSCREEN"));
    }
  };

  Blockly.Blocks['get_last_touch_position'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_GET TOUCH POSITION"));
      this.setColour(120);
      this.setOutput(true,"Position");
      this.setTooltip(msg("PGZ_RETURNS THE TOUCH POSITION"));
    }
  };

  Blockly.Blocks['get_last_touch_position_property'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_GET THE"))
          .appendField(new Blockly.FieldDropdown([[msg("PGZ_X COORDINATE"),"0"], [msg("PGZ_Y COORDINATE"),"1"]]), "PROPERTY")
          .appendField(msg("PGZ_OF THE TOUCH POSITION"));
      this.setOutput(true, "Number");
      this.setColour(120);
      this.setTooltip(msg("PGZ_GET A COORDINATE PROPERTY VALUE FROM THE LAST TOUCH (INSIDE A TOUCHSCREEN EVENT HANDLER ONLY !)"));
    }
  };

  Blockly.Blocks['get_last_drag_distance'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_GET DRAG DISTANCE"));
      this.setColour(120);
      this.setOutput(true,"Position");
      this.setTooltip(msg("PGZ_RETURNS THE RELATIVE DISTANCE OF THE DRAG EVENT"));
    }
  };

  Blockly.Blocks['actor'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_ADD A NEW GAME ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "NAME")
          .appendField(msg("PGZ_ANCHORED BY ITS"))
          .appendField(new Blockly.FieldDropdown([ [msg("PGZ_TOP LEFT") ,"('left','top')"], [msg("PGZ_CENTER"),"('center','middle')"], [msg("PGZ_MIDDLE TOP") ,"('center','top')"], [msg("PGZ_TOP RIGHT") ,"('right','top')"], [msg("PGZ_MIDDLE LEFT") ,"('left','middle')"], [msg("PGZ_MIDDLE RIGHT") ,"('right', 'middle')"], [msg("PGZ_BOTTOM LEFT") ,"('left','bottom')"], [msg("PGZ_MIDDLE BOTTOM"),"('center','bottom')"], [msg("PGZ_BOTTOM RIGHT") ,"('right','bottom')"]]), "ANCHOR")
          .appendField(msg("PGZ_AT POSITION X"))
          .appendField(new Blockly.FieldNumber(0), "POSX")
          .appendField(msg("PGZ_Y"))
          .appendField(new Blockly.FieldNumber(0), "POSY");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setColour(0);
      this.setTooltip(msg("PGZ_DEFINE A NEW ACTOR IN THE GAME"));
    }
  };

  Blockly.Blocks['actor_image'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_UPDATE ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "ACTOR")
          .appendField(msg("PGZ_WITH IMAGE"));
      this.appendValueInput("IMAGE")
          .setCheck("String");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip(msg("PGZ_CHANGE THE ACTOR TO ANOTHER IMAGE"));
    }
  };

  Blockly.Blocks['get_actor_property'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_GET THE"))
          .appendField(new Blockly.FieldDropdown([[msg("PGZ_X COORDINATE"),"x"], [msg("PGZ_Y COORDINATE"),"y"]]), "PROPERTY")
          .appendField(msg("PGZ_POSITION OF ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "ACTOR");
      this.setOutput(true, "Number");
      this.setColour(0);
      this.setTooltip(msg("PGZ_GET A PROPERTY VALUE FROM AN ACTOR"));
    }
  };

  Blockly.Blocks['actor_position'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_MOVE ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "ACTOR")
          .appendField(msg("PGZ_TO POSITION X"));
      this.appendValueInput("POSX")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_Y"));
      this.appendValueInput("POSY")
          .setCheck("Number");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip(msg("PGZ_MOVE THE CHARACTER TO A GIVEN POSITION"));
    }
  };

  Blockly.Blocks['actor_position_tuple'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_MOVE ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "ACTOR")
          .appendField(msg("PGZ_TO POSITION TUPLE"));
      this.appendValueInput("POS")
          .setCheck("Position");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip(msg("PGZ_MOVE THE CHARACTER TO A GIVEN POSITION USING A TUPLE"));
    }
  };

  Blockly.Blocks['actor_colliding'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "ACTOR")
          .appendField(msg("PGZ_COLLIDING WITH POSITION"));
      this.appendValueInput("POSITION")
          .setCheck("Position");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(0);
      this.setTooltip(msg("PGZ_RETURNS TRUE IF THE ACTOR IS COLLIDING WITH THE GIVEN POSITION"));
    }
  };

  Blockly.Blocks['actor_colliding_rect'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "ACTOR")
          .appendField(msg("PGZ_COLLIDING WITH RECTANGLE OR ACTOR"));
      this.appendValueInput("RECTANGLE")
          .setCheck(null);
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(0);
      this.setTooltip(msg("PGZ_RETURNS TRUE IF THE ACTOR IS COLLIDING WITH THE GIVEN RECTANGLE"));
    }
  };

  Blockly.Blocks['actor_draw'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_DRAW ACTOR"))
          .appendField(new Blockly.FieldVariable("item"), "ACTOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip(msg("PGZ_DRAW THE ACTOR ON THE SCREEN AT ITS SET POSITION"));
    }
  };

  const animateBlocks = ['animate_position'];

  Blockly.Blocks['animate'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_ANIMATE OBJECT"))
          .appendField(new Blockly.FieldVariable("item"), "OBJECT");
      this.appendDummyInput()
          .appendField(msg("PGZ_USING TWEENING MODE"))
          .appendField(new Blockly.FieldDropdown([[msg("PGZ_LINEAR"),"linear"], [msg("PGZ_ACCELERATE"),'accelerate'], [msg("PGZ_DECELERATE"),'decelerate'], [msg("PGZ_ACCELERATE THEN DECELERATE"),'accel_decel'], [msg("PGZ_ELASTIC AT THE END"),'end_elastic'], [msg("PGZ_ELASTIC AT THE START"),'start_elastic'], [msg("PGZ_ELASTIC AT START AND END"),'both_elastic'], [msg("PGZ_BOUNCE AT THE END"),'bounce_end'], [msg("PGZ_BOUNCE AT THE START"),'bounce_start'], [msg("PGZ_BOUNCE AT THE START AND END"),'bounce_start_end']]), "TWEENING");
      this.appendDummyInput()
          .appendField(msg("PGZ_DURING"));
      this.appendValueInput("DURATION")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_SECONDS"));
      this.appendStatementInput("TARGETS")
          .setCheck(animateBlocks);
      this.appendDummyInput()
          .appendField(msg("PGZ__WHEN FINISHED EXECUTE THIS CODE"));
      this.appendStatementInput("ON_FINISHED")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip(msg("PGZ_ANIMATE THE ACTOR BY UPDATING ITS PROPERTIES PROGRESSIVELY"));
    }
  };

  Blockly.Blocks['animate_position'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_POSITION"))
          .appendField(msg("PGZ_X"));
      this.appendValueInput("X")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_Y"));
      this.appendValueInput("Y")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true, animateBlocks);
      this.setNextStatement(true, animateBlocks);
      this.setColour(0);
      this.setTooltip(msg("PGZ_DEFINES A POSITION TARGET FOR ANIMATION"));
    }
  };

  Blockly.Blocks['screen_size'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_SET THE SCREEN'S WIDTH"))
          .appendField(new Blockly.FieldNumber(0, 0), "W")
          .appendField(msg("PGZ_AND HEIGHT"))
          .appendField(new Blockly.FieldNumber(0, 0), "H");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_SETS THE SCREEN WIDTH AND HEIGHT"));
    }
  };

  Blockly.Blocks['screen_clear'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_CLEAR THE SCREEN"));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_REMOVES EVERYTHING OFF THE SCREEN"));
    }
  };

  Blockly.Blocks['screen_fill'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_FILL SCREEN WITH"))
          .appendField(new FieldColour("#000000"), "COLOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_FILL THE SCREEN WITH THE GIVEN COLOR"));
    }
  };

  Blockly.Blocks['screen_blit'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_DRAW IMAGE"));
      this.appendValueInput("IMAGE")
          .setCheck("String");
      this.appendDummyInput()
          .appendField(msg("PGZ_ON THE SCREEN AT POSITION"));
      this.appendValueInput("TOP")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(",");
      this.appendValueInput("LEFT")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_DRAWS THE GIVEN IMAGE FILE ON THE SCREEN"));
    }
  };

  Blockly.Blocks['screen_create_rect'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_CREATE A RECTANGLE"));
      this.appendValueInput("X")
          .setCheck("Number")
          .appendField("X");
      this.appendValueInput("Y")
          .setCheck("Number")
          .appendField("Y");
      this.appendValueInput("WIDTH")
          .setCheck("Number")
          .appendField(msg("PGZ_WIDTH"));
      this.appendValueInput("HEIGHT")
          .setCheck("Number")
          .appendField(msg("PGZ_HEIGHT"));
      this.setInputsInline(true);
      this.setOutput(true, "Rect");
      this.setColour(270);
      this.setTooltip(msg("PGZ_CREATE A RECTANGULAR SURFACE FOR USE IN PYGAME"));
    }
  };

  Blockly.Blocks['screen_draw_line'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_DRAW A LINE FROM"));
      this.appendValueInput("STARTX")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(",");
      this.appendValueInput("STARTY")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_TO"));
      this.appendValueInput("FINISHX")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(",");
      this.appendValueInput("FINISHY")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_IN COLOR"))
          .appendField(new FieldColour("#FFFFFF"), "COLOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_DRAWS A LINE ON THE SCREEN"));
    }
  };

  Blockly.Blocks['screen_draw_circle'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_DRAW A(N)"))
          .appendField(new Blockly.FieldDropdown([ [msg("PGZ_EMPTY"),"circle"], [msg("PGZ_FILLED"),"filled_circle"]]), "EMPTYFILLED");
      this.appendDummyInput()
          .appendField(msg("PGZ_CIRCLE AT"));
      this.appendValueInput("CENTERX")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(",");
      this.appendValueInput("CENTERY")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_AND A RADIUS OF"));
      this.appendValueInput("RADIUS")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_IN COLOR"))
          .appendField(new FieldColour("#FFFF00"), "COLOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_DRAWS A CIRCLE ON THE SCREEN"));
    }
  };

  Blockly.Blocks['screen_draw_rectangle'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_DRAW A(N)"))
          .appendField(new Blockly.FieldDropdown([ [msg("PGZ_EMPTY"),"rect"], [msg("PGZ_FILLED"),"filled_rect"]]), "EMPTYFILLED");
      this.appendDummyInput()
          .appendField(msg("PGZ_RECTANGLE "));
      this.appendValueInput("RECT")
          .setCheck("Rect");
      this.appendDummyInput()
          .appendField(msg("PGZ_IN COLOR"))
          .appendField(new FieldColour("#FF0000"), "COLOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_DRAWS A RECTANGLE ON THE SCREEN"));
    }
  };

  const pgzTextFormatBlocks = [
    "format_font_name",
    "format_font_size",
    "format_font_color",
    "format_font_bgcolor",
    "format_text_position",
    "format_text_rotation",
    "format_text_align",
    "format_text_shadow"
  ];

  Blockly.Blocks['screen_draw_text'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_DRAW TEXT"));
      this.appendValueInput("TEXT")
          .setCheck("String");
      this.appendDummyInput()
          .appendField(msg("PGZ_FORMATTED AS"));
      this.appendStatementInput("FORMAT")
          .setCheck(pgzTextFormatBlocks);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip(msg("PGZ_DRAWS THE GIVEN TEXT ON THE SCREEN USING FORMATTING"));
    }
  };

  Blockly.Blocks['format_font_name'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_FONT NAME"));
      this.appendValueInput("VALUE")
          .setCheck("String");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS THE FONT NAME OF THE TEXT"));
    }
  };

  Blockly.Blocks['format_font_size'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_FONT SIZE"));
      this.appendValueInput("VALUE")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS THE FONT SIZE OF THE TEXT"));
    }
  };

  Blockly.Blocks['format_font_color'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_FONT COLOR"))
          .appendField(new FieldColour("#FFFFFF"), "VALUE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS THE FONT COLOR OF THE TEXT"));
    }
  };

  Blockly.Blocks['format_font_bgcolor'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_FONT BACKGROUND COLOR"))
          .appendField(new FieldColour("#FFFFFF"), "VALUE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS THE FONT BACKGROUND COLOR OF THE TEXT"));
    }
  };

  Blockly.Blocks['format_text_position'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_TEXT POSITION ANCHORED BY ITS"))
          .appendField(new Blockly.FieldDropdown([ [msg("PGZ_TOP LEFT"),"topleft"], [msg("PGZ_CENTER"),"center"],  [msg("PGZ_MIDDLE TOP"),"midtop"], [msg("PGZ_TOP RIGHT"),"topright"], [msg("PGZ_MIDDLE LEFT"),"midleft"], [msg("PGZ_MIDDLE RIGHT"),"midright"], [msg("PGZ_MIDDLE BOTTOM"),"midbottom"], [msg("PGZ_BOTTOM RIGHT"),"bottomright"], [msg("PGZ_BOTTOM LEFT"),"bottomleft"]]), "ANCHOR")
          .appendField(msg("PGZ_AT X"));
      this.appendValueInput("X")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_Y"));
      this.appendValueInput("Y")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS THE POSITION ANCHOR OF THE TEXT"));
    }
  };

  Blockly.Blocks['format_text_rotation'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_TEXT ROTATION ANGLE"))
          .appendField(new FieldAngle(0), "VALUE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS THE ROTATION ANGLE OF THE TEXT"));
    }
  };

  Blockly.Blocks['format_text_align'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_TEXT ALIGNED TO THE "))
          .appendField(new Blockly.FieldDropdown([ [msg("PGZ_LEFT"),"left"], [msg("PGZ_CENTER"),"center"], [msg("PGZ_RIGHT"),"right"]]), "VALUE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS THE ALIGNMENT OF THE TEXT"));
    }
  };

  Blockly.Blocks['format_text_shadow'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_TEXT SHADOW OFFSET BY "))
          .appendField(msg("PGZ_X"));
      this.appendValueInput("X")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_Y"));
      this.appendValueInput("Y")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true, pgzTextFormatBlocks);
      this.setNextStatement(true, pgzTextFormatBlocks);
      this.setColour(250);
      this.setTooltip(msg("PGZ_SETS A SHADOW UNDER THE TEXT WITH THE GIVEN OFFSET"));
    }
  };

  Blockly.Blocks['clock_schedule'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_SCHEDULE"))
          .appendField(new Blockly.FieldDropdown([ [msg("PGZ_ONCE"),"schedule_unique"], [msg("PGZ_FOREVER"),"schedule"] ]), "REPEAT");
      this.appendDummyInput()
          .appendField(msg("PGZ_IN"));
      this.appendValueInput("DELAY")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_SECOND(S)"));
      this.appendStatementInput("STATEMENTS")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(msg("PGZ__OPTIONAL CALLBACK NAME"));
      this.appendValueInput("CALLBACK_NAME")
          .setCheck("String");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip(msg("PGZ_EXECUTE THE GIVEN CODE AFTER THE GIVEN DELAY (ONCE OR UNTIL CANCELLED)"));
    }
  };

  Blockly.Blocks['clock_schedule_interval'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_SCHEDULE"));
      this.appendDummyInput()
          .appendField(msg("PGZ_EVERY"));
      this.appendValueInput("INTERVAL")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(msg("PGZ_SECOND(S)"));
      this.appendStatementInput("STATEMENTS")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(msg("PGZ__OPTIONAL CALLBACK NAME"));
      this.appendValueInput("CALLBACK_NAME")
          .setCheck("String");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip(msg("PGZ_EXECUTE THE GIVEN CODE AT THE GIVEN INTERVAL"));
    }
  };

  Blockly.Blocks['clock_unschedule'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField(msg("PGZ_CANCEL SCHEDULED CALLBACK"));
      this.appendValueInput("CALLBACK_NAME")
          .setCheck("String");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip(msg("PGZ_CANCEL THE GIVEN CALLBACK"));
    }
  };
};