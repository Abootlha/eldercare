import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@mediapipe/hands';
import { Camera, Volume2, Type } from 'lucide-react';
import { motion } from 'framer-motion';

// Sign language gestures mapping
const gestureMap: { [key: string]: string } = {
  'HELLO': 'Thumb up with spread fingers',
  'THANK_YOU': 'Flat hand from chin forward',
  'YES': 'Nodding fist',
  'NO': 'Head shake with index finger',
  // Add more gestures as needed
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
];

export const SignLanguageTranslator = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translation, setTranslation] = useState('');
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      // Load TensorFlow.js and HandPose model
      await tf.ready();
      const loadedModel = await handpose.Hands.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const startTranslation = async () => {
    if (!model) return;
    setIsTranslating(true);

    const detectHands = async () => {
      if (!webcamRef.current || !canvasRef.current || !isTranslating) return;

      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!video || !ctx) return;

      // Set canvas dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      try {
        // Detect hands
        const hands = await model.estimateHands(video);

        if (hands.length > 0) {
          // Draw hand landmarks
          drawHands(hands, ctx);
          
          // Recognize gesture
          const gesture = recognizeGesture(hands[0].landmarks);
          if (gesture) {
            setTranslation(gesture);
            speakTranslation(gesture, selectedLanguage);
          }
        }

        if (isTranslating) {
          requestAnimationFrame(detectHands);
        }
      } catch (error) {
        console.error('Error detecting hands:', error);
      }
    };

    detectHands();
  };

  const drawHands = (hands: any[], ctx: CanvasRenderingContext2D) => {
    hands.forEach(hand => {
      hand.landmarks.forEach((landmark: number[]) => {
        ctx.beginPath();
        ctx.arc(landmark[0], landmark[1], 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#2563eb';
        ctx.fill();
      });
    });
  };

  const recognizeGesture = (landmarks: number[][]) => {
    // Implement gesture recognition logic here
    // This is a simplified example
    const thumbUp = landmarks[4][1] < landmarks[3][1];
    const fingersSpread = 
      landmarks[8][1] < landmarks[7][1] &&
      landmarks[12][1] < landmarks[11][1] &&
      landmarks[16][1] < landmarks[15][1] &&
      landmarks[20][1] < landmarks[19][1];

    if (thumbUp && fingersSpread) {
      return 'HELLO';
    }

    return '';
  };

  const speakTranslation = (text: string, language: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Sign Language Translator
            </h2>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="input-field w-40"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-6">
            <Webcam
              ref={webcamRef}
              className="rounded-lg"
              mirrored
              style={{ display: isTranslating ? 'block' : 'none' }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ display: isTranslating ? 'block' : 'none' }}
            />
            {!isTranslating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={startTranslation}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Camera className="h-5 w-5" />
                  <span>Start Translation</span>
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Translation Output
              </h3>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:text-blue-700">
                  <Volume2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-blue-600 hover:text-blue-700">
                  <Type className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 min-h-[100px]">
              {translation ? (
                <p className="text-gray-900">{translation}</p>
              ) : (
                <p className="text-gray-500">
                  Translation will appear here when you start signing
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};