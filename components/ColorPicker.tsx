'use client';

import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
interface Props {
  onFileChange: (filePath: string) => void;
}
const ColorPicker = ({onFileChange}: Props) => {
const [color, setColor] = useState("#000000");
  return (
    <div className="">
        <div className="flex items-center gap-2 light-upload-btn pl-4">
            <div className={`w-5 h-5 rounded-sm`} style={{ backgroundColor: color }}></div>
            <HexColorInput color={color} onChange={setColor}/>
        </div>
        <HexColorPicker color={color} onChange={setColor} className="hidden!"/>
    </div>
  )
}

export default ColorPicker