import * as Blockly from 'blockly/core';
import * as En from 'blockly/msg/en';
import { pythonGenerator } from 'blockly/python';
import 'blockly/blocks';

// Inject English language
Blockly.setLocale(En);

import { initBlocklyPygameZero, toolboxXml, workspaceXml } from '../src/index';

// Initialize our blocks and generators
initBlocklyPygameZero(pythonGenerator);

const fullToolbox = `
<xml xmlns="http://www.w3.org/1999/xhtml">
  <category name="Pygame Zero">
    <block type="draw_loop"></block>
    <block type="update_loop"></block>
    <block type="on_touch_event"></block>
    <block type="on_drag_event"></block>
    <block type="get_last_touch_position"></block>
    <block type="get_last_touch_position_property"></block>
    <block type="get_last_drag_distance"></block>
    <block type="actor"></block>
    <block type="actor_image"></block>
    <block type="get_actor_property"></block>
    <block type="actor_position"></block>
    <block type="actor_position_tuple"></block>
    <block type="actor_colliding"></block>
    <block type="actor_colliding_rect"></block>
    <block type="actor_draw"></block>
    <block type="animate"></block>
    <block type="animate_position"></block>
    <block type="screen_size"></block>
    <block type="screen_clear"></block>
    <block type="screen_fill"></block>
    <block type="screen_blit"></block>
    <block type="screen_create_rect"></block>
    <block type="screen_draw_line"></block>
    <block type="screen_draw_circle"></block>
    <block type="screen_draw_rectangle"></block>
    <block type="screen_draw_text"></block>
    <block type="format_font_name"></block>
    <block type="format_font_size"></block>
    <block type="format_font_color"></block>
    <block type="format_font_bgcolor"></block>
    <block type="format_text_position"></block>
    <block type="format_text_rotation"></block>
    <block type="format_text_align"></block>
    <block type="format_text_shadow"></block>
    <block type="clock_schedule"></block>
    <block type="clock_schedule_interval"></block>
    <block type="clock_unschedule"></block>
  </category>
  <category name="Logic" colour="%{BKY_LOGIC_HUE}">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
  </category>
  <category name="Math" colour="%{BKY_MATH_HUE}">
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
  </category>
  <category name="Text" colour="%{BKY_TEXTS_HUE}">
    <block type="text"></block>
  </category>
</xml>
`;

document.addEventListener("DOMContentLoaded", () => {
    const blocklyDiv = document.getElementById('blocklyDiv');
    const pythonCodeDiv = document.getElementById('pythonCode');
    
    if (blocklyDiv) {
        const workspace = Blockly.inject(blocklyDiv, {
            toolbox: fullToolbox
        });
        
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(workspaceXml), workspace);
        
        const updatePython = () => {
            const code = pythonGenerator.workspaceToCode(workspace);
            if (pythonCodeDiv) {
                pythonCodeDiv.textContent = code;
            }
        };

        workspace.addChangeListener(updatePython);
        updatePython(); // initial generation
    }
});
