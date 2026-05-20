import * as Blockly from 'blockly/core';

export const defineGenerators = (pythonGenerator: any) => {
  const Python = pythonGenerator;
  if (!Python) return;
  if (!Python.forBlock) {
    Python.forBlock = {};
  }

  /**
   * Convert a given HEX color code to a string (handling the padding)
   */
  function hexToRgb(hex: string): string {
      if(!hex){
          return "(0,0,0)";
      }
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return (result && result[1] && result[2] && result[3] ? parseInt(result[1], 16)+","+parseInt(result[2], 16)+","+parseInt(result[3], 16) : "(0,0,0)");
  }


  const PythonForBlock: any = Python.forBlock;
  function getGlobalVariablesStatement(block: Blockly.Block, addLineReturn: boolean = true) {
    // taken from blockly/blob/master/generators/python/procedures.js
    var globals = [];
    var workspace = block.workspace;
    var varName;
    var variables = workspace.getAllVariables() || [];
    for (var i = 0, variable; variable = variables[i]; i++) {
      varName = (variable as any).name || (variable as any).getId();
      if (varName) {
        globals.push(Python.nameDB_.getName(varName, Blockly.Names.NameType.VARIABLE));
      }
    }
    var globalsStr = globals.length ? '  global ' + globals.join(', ') + (addLineReturn?'\n':'') : '';
    return globalsStr;
  }


  PythonForBlock['draw_loop'] = function(block: Blockly.Block) {
    var statements = Python.statementToCode(block, 'STATEMENTS');
    var globals = getGlobalVariablesStatement(block);
    var code = 'def draw():\n'+globals+statements+'\n';
    return code;
  };

  PythonForBlock['update_loop'] = function(block: Blockly.Block) {
    var statements = Python.statementToCode(block, 'STATEMENTS');
    var globals = getGlobalVariablesStatement(block);
    var code = 'def update():\n'+globals+statements+'\n';
    return code;
  };

  PythonForBlock['on_touch_event'] = function(block: Blockly.Block) {
    var event = block.getFieldValue('EVENT');
    var globals = getGlobalVariablesStatement(block);
    var statements = Python.statementToCode(block, 'STATEMENTS');
    var code = 'def '+event+'(pos):\n'+globals+statements+'\n';
    return code;
  };

  PythonForBlock['on_drag_event'] = function(block: Blockly.Block) {
    var statements = Python.statementToCode(block, 'STATEMENTS');
    var globals = getGlobalVariablesStatement(block);
    var code = 'def on_mouse_move(pos,rel):\n'+globals+statements+'\n';
    return code;
  };

  PythonForBlock['get_last_touch_position'] = function(block: Blockly.Block) {
    var code = 'pos';
    return [code, Python.ORDER_ADDITION];
  };

  PythonForBlock['get_last_touch_position_property'] = function(block: Blockly.Block) {
    var dropdown_property = block.getFieldValue('PROPERTY');
    var code = 'pos['+dropdown_property+']';
    return [code, Python.ORDER_ADDITION];
  };

  PythonForBlock['get_last_drag_distance'] = function(block: Blockly.Block) {
    var code = 'rel';
    return [code, Python.ORDER_ADDITION];
  };


  PythonForBlock['actor'] = function(block: Blockly.Block) {
    var actor_var_name = block.getFieldValue('NAME');
    var dropdown_anchor = block.getFieldValue('ANCHOR');
    var number_posx = block.getFieldValue('POSX');
    var number_posy = block.getFieldValue('POSY');
    var code = actor_var_name +' = Actor(\''+actor_var_name+'\',anchor='+dropdown_anchor+',pos=('+number_posx+','+number_posy+'))\n';
    return code;
  };

  PythonForBlock['actor_image'] = function(block: Blockly.Block) {
    var variable_actor = Python.nameDB_.getName(block.getFieldValue('ACTOR'), Blockly.Names.NameType.VARIABLE);
    var value_image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC);
    var code = variable_actor+'.image='+value_image+'\n';
    return code;
  };

  PythonForBlock['actor_draw'] = function(block: Blockly.Block) {
    var variable_actor = Python.nameDB_.getName(block.getFieldValue('ACTOR'), Blockly.Names.NameType.VARIABLE);
    var code = variable_actor+'.draw()\n';
    return code;
  };

  PythonForBlock['get_actor_property'] = function(block: Blockly.Block) {
    var dropdown_property = block.getFieldValue('PROPERTY');
    var variable_actor = Python.nameDB_.getName(block.getFieldValue('ACTOR'), Blockly.Names.NameType.VARIABLE);
    var code = variable_actor+'.'+dropdown_property;
    return [code, Python.ORDER_ADDITION];
  };

  PythonForBlock['actor_colliding'] = function(block: Blockly.Block) {
    var actor = Python.nameDB_.getName(block.getFieldValue('ACTOR'), Blockly.Names.NameType.VARIABLE);
    var position = Python.valueToCode(block,'POSITION', Python.ORDER_ATOMIC);
    var code = actor+'.collidepoint('+position+')';
    return [code, Python.ORDER_ADDITION];
  };

  PythonForBlock['actor_colliding_rect'] = function(block: Blockly.Block) {
    var actor = Python.nameDB_.getName(block.getFieldValue('ACTOR'), Blockly.Names.NameType.VARIABLE);
    var rect = Python.valueToCode(block,'RECTANGLE', Python.ORDER_ATOMIC);
    var code = actor+'.colliderect('+rect+')';
    return [code, Python.ORDER_ADDITION];
  };

  PythonForBlock['actor_position'] = function(block: Blockly.Block) {
    var variable_actor = Python.nameDB_.getName(block.getFieldValue('ACTOR'), Blockly.Names.NameType.VARIABLE);
    var value_posx = Python.valueToCode(block, 'POSX', Python.ORDER_ATOMIC);
    var value_posy = Python.valueToCode(block, 'POSY', Python.ORDER_ATOMIC);
    var code = variable_actor+'.pos = '+value_posx+','+value_posy+'\n';
    return code;
  };
  PythonForBlock['actor_position_tuple'] = function(block: Blockly.Block) {
    var variable_actor = Python.nameDB_.getName(block.getFieldValue('ACTOR'), Blockly.Names.NameType.VARIABLE);
    var value_pos = Python.valueToCode(block, 'POS', Python.ORDER_ATOMIC);
    var code = variable_actor+'.pos = '+value_pos+'\n';
    return code;
  };

  PythonForBlock['animate'] = function(block: Blockly.Block) {
    var on_finished_statements = Python.statementToCode(block, 'ON_FINISHED');
    var variable_object = Python.nameDB_.getName(block.getFieldValue('OBJECT'), Blockly.Names.NameType.VARIABLE);
    var dropdown_tweening = block.getFieldValue('TWEENING');
    var value_duration = Python.valueToCode(block, 'DURATION', Python.ORDER_ATOMIC);
    var functionName;
    var globals = getGlobalVariablesStatement(block,false);
    if( ( on_finished_statements) && (on_finished_statements.trim() != "") ){
        var onFinishedFunctionName = Python.nameDB_.getDistinctName('on_finished_animation', Blockly.Names.NameType.PROCEDURE);
        functionName = Python.provideFunction_(
          onFinishedFunctionName,
          [ 'def ' + Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
            globals,on_finished_statements,
            '\n']);
    }
    
    var targetArray = Python.statementToCode(block,'TARGETS');
    var arrayDict = "";
    // Convert target attributes array into a python dictionary that we unpack to
    // fill named arguments
    if(targetArray != null && targetArray.length > 0){
        arrayDict = ","+(targetArray.replace(/\,\s*$/, ' '))+"";
    }
    var onComplete='';
    
    if(functionName){
        onComplete = ',on_finished='+functionName;
    }

    var code = 'animate('+variable_object+',tween=\''+dropdown_tweening+'\',duration='+value_duration+arrayDict+onComplete+')';
    return code; 
  };


  PythonForBlock['animate_position'] = function(block: Blockly.Block) {
    var x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC);
    var code = "pos=("+x+','+y+"),";
    return code;
  };

  PythonForBlock['screen_size'] = function(block: Blockly.Block) {
    var w= block.getFieldValue('W');
    var h= block.getFieldValue('H');
    return "WIDTH="+w+"\nHEIGHT="+h+"\n";
  };

  PythonForBlock['screen_clear'] = function(block: Blockly.Block) {
    var code = 'screen.clear()\n';
    return code;
  };

  PythonForBlock['screen_blit'] = function(block: Blockly.Block) {
    var value_image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC);
    var number_top = Python.valueToCode(block, 'TOP', Python.ORDER_ATOMIC);
    var number_left =Python.valueToCode(block, 'LEFT', Python.ORDER_ATOMIC);
    var code = 'screen.blit('+value_image+',('+number_top+','+number_left+'))\n';
    return code;
  };

  PythonForBlock['screen_fill'] = function(block: Blockly.Block) {
    var color_rgb = hexToRgb(block.getFieldValue('COLOR'));
    var code = 'screen.fill(('+color_rgb+'))\n';
    return code;
  };

  PythonForBlock['screen_create_rect'] = function(block: Blockly.Block) {
    var value_x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC);
    var value_y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC);
    var value_width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC);
    var value_height = Python.valueToCode(block, 'HEIGHT', Python.ORDER_ATOMIC);
    var code = 'Rect(('+value_x+','+value_y+'),('+value_width+','+value_height+'))';
    return [code, Python.ORDER_ADDITION];
  };

  PythonForBlock['screen_draw_line'] = function(block: Blockly.Block) {
    var color_rgb = hexToRgb(block.getFieldValue('COLOR'));
    var startx = Python.valueToCode(block, 'STARTX', Python.ORDER_ATOMIC);
    var starty = Python.valueToCode(block, 'STARTY', Python.ORDER_ATOMIC);
    var finishx = Python.valueToCode(block, 'FINISHX', Python.ORDER_ATOMIC);
    var finishy = Python.valueToCode(block, 'FINISHY', Python.ORDER_ATOMIC);
    
    var code = 'screen.draw.line(('+startx+','+starty+'),('+finishx+','+finishy+'),('+color_rgb+'))\n';
    return code;
  };

  PythonForBlock['screen_draw_circle'] = function(block: Blockly.Block) {
    var emptyOrFilled =  block.getFieldValue('EMPTYFILLED');
    var color_rgb = hexToRgb(block.getFieldValue('COLOR'));
    var x = Python.valueToCode(block, 'CENTERX', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'CENTERY', Python.ORDER_ATOMIC);
    
    var code = 'screen.draw.'+emptyOrFilled+'(('+x+','+y+'),('+color_rgb+'))\n';
    return code;
  };

  PythonForBlock['screen_draw_rectangle'] = function(block: Blockly.Block) {
    var emptyOrFilled =  block.getFieldValue('EMPTYFILLED');
    var color_rgb = hexToRgb(block.getFieldValue('COLOR'));
    var rect = Python.valueToCode(block, 'RECT', Python.ORDER_ATOMIC);
    
    var code = 'screen.draw.'+emptyOrFilled+'('+rect+',('+color_rgb+'))\n';
    return code;
  };

  PythonForBlock['screen_draw_text'] = function(block: Blockly.Block) {
    var text =  Python.valueToCode(block, 'TEXT', Python.ORDER_ATOMIC);
    var formatArray = Python.statementToCode(block,'FORMAT');
    var arrayDict = "";
    // Convert text format array into a python dictionary that we unpack to
    // fill named arguments
    if(formatArray != null && formatArray.length > 0){
        arrayDict = ",**{"+(formatArray.replace(/\,\s*$/, '  '))+"}";
    }
    
    var code = 'screen.draw.text('+text+arrayDict+')\n';
    return code;
  };

  PythonForBlock['format_font_name'] = function(block: Blockly.Block) {
    var value =  Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC);
    var code = "'fontname':"+value+",";
    return code;
  };

  PythonForBlock['format_font_size'] = function(block: Blockly.Block) {
    var value =  Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC);
    var code = "'fontsize':"+value+",";
    return code;
  };
  PythonForBlock['format_font_color'] = function(block: Blockly.Block) {
    var value =  hexToRgb( block.getFieldValue('VALUE'));
    var code = "'color':("+value+"),";
    return code;
  };
  PythonForBlock['format_font_bgcolor'] = function(block: Blockly.Block) {
    var value =  hexToRgb(block.getFieldValue('VALUE'));
    var code = "'background':("+value+"),";
    return code;
  };

  PythonForBlock['format_text_position'] = function(block: Blockly.Block) {
    var value_anchor = block.getFieldValue('ANCHOR');
    var x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC);
    var code = "'"+value_anchor+"':("+x+','+y+"),";
    return code;
  };

  PythonForBlock['format_text_rotation'] = function(block: Blockly.Block) {
    var value_angle = block.getFieldValue('VALUE');
    var code = "'angle':"+value_angle+",";
    return code;
  };

  PythonForBlock['format_text_align'] = function(block: Blockly.Block) {
    var value =  block.getFieldValue('VALUE');
    var code = "'align':'"+value+"',";
    return code;
  };

  PythonForBlock['format_text_shadow'] = function(block: Blockly.Block) {
    var x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC);
    var y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC);
    var code = "'shadow':("+x+','+y+"),";
    return code;
  };

  PythonForBlock['clock_schedule'] = function(block: Blockly.Block) {
    var statements = Python.statementToCode(block, 'STATEMENTS');
    var repeatMode =  block.getFieldValue('REPEAT');
    var callbackName = Python.valueToCode(block, 'CALLBACK_NAME', Python.ORDER_ATOMIC);
    
    if( (! callbackName) || (callbackName.trim() == "") ){
      callbackName = Python.nameDB_.getDistinctName('scheduled', Blockly.Names.NameType.PROCEDURE);
    }
    
    var globals = getGlobalVariablesStatement(block,false);
    var functionName = Python.provideFunction_(
      callbackName,
      [ 'def ' + Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        globals, 
        statements,
        '\n']);
    var delay = Python.valueToCode(block, 'DELAY', Python.ORDER_ATOMIC);
    
    var code = 'clock.'+repeatMode+'('+functionName+','+delay+')\n';
    return code;  
  };

  PythonForBlock['clock_schedule_interval'] = function(block: Blockly.Block) {
    var statements = Python.statementToCode(block, 'STATEMENTS');
    var callbackName = Python.valueToCode(block, 'CALLBACK_NAME', Python.ORDER_ATOMIC);
    
    if( (! callbackName) || (callbackName.trim() == "") ){
      callbackName = Python.nameDB_.getDistinctName('scheduled', Blockly.Names.NameType.PROCEDURE);
    }
    
    var globals = getGlobalVariablesStatement(block,false);
    var functionName = Python.provideFunction_(
      callbackName,
      [ 'def ' + Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        globals,
        statements,
        '\n']);
    var interval = Python.valueToCode(block, 'INTERVAL', Python.ORDER_ATOMIC);
    
    var code = 'clock.schedule_interval('+functionName+','+interval+')\n';
    return code;  
  };

  PythonForBlock['clock_unschedule'] = function(block: Blockly.Block) {
    var callbackName = Python.valueToCode(block, 'CALLBACK_NAME', Python.ORDER_ATOMIC);
    
    var functionName = (Python.nameDB_ as any).getName(callbackName, Blockly.Names.NameType.PROCEDURE);
    var code = 'clock.unschedule('+functionName+')\n';
    return code;  
  };
}
