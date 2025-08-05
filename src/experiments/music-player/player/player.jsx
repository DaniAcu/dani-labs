"use client"

import React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Play, Pause } from "lucide-react"
import { useEffect } from "react"
import { bassExtractor } from "../sphere/bass-extractor"

const STATUS = {
  INITIAL: 'INITIAL',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
}

function Icon(props) {
  switch (props.status) {
    case STATUS.PAUSED:
      return (
        <motion.div
          key="play"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Play className="w-5 h-5 ml-0.5" />
        </motion.div>
      );
    case STATUS.PLAYING:
      return (
        <motion.div
          key="pause"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Pause className="w-5 h-5" />
        </motion.div>
      );
    case STATUS.INITIAL:
    default:
      return (
        <motion.div
          key="upload"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <Upload className="w-5 h-5" />
        </motion.div>
      );
  }
}

function Button(props) {
  return (
    <motion.button
      onClick={props.onClick}
      className="fixed bottom-[5vh] right-[5vh] w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <AnimatePresence mode="wait">
        <Icon status={props.status} />
      </AnimatePresence>

    </motion.button>
  );

}

export default function Player(props) {
  const [status, setStatus] = useState(STATUS.INITIAL);

  const fileInputRef = useRef(null)

  const handleFileUpload = (event) => {
    setStatus(STATUS.PAUSED);
    
    const file = event.target.files?.[0];

    if (!file) {
      setStatus(STATUS.INITIAL);
    }
    
    props.onUpload(file);
  }

  const handleButtonClick = () => {
    switch(status) {
      case STATUS.PLAYING:
        setStatus(STATUS.PAUSED);
        break;
      case STATUS.PAUSED:
        setStatus(STATUS.PLAYING)
        break;
      case STATUS.INITIAL:
      default:
        fileInputRef.current?.click();
    }
  }

  useEffect(() => {

    const run = () => {
      switch(status) {
        case STATUS.PLAYING:
          return bassExtractor.playWithBassDetection();
        case STATUS.PAUSED:
          return bassExtractor.pause();
        default:
          return bassExtractor.stop();
      }
    }

    run();

    

  }, [status])


  return (
    <>
      <Button status={status} onClick={handleButtonClick} />
      <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" accept="audio/*" />
    </>
  )
}
