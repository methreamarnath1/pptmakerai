
import { toast } from 'sonner';

interface GenerationOptions {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
}

export async function generateContent(
  apiKey: string,
  prompt: string,
  options: GenerationOptions = {}
) {
  try {
    // Using gemini-2.0-flash model which is supported by the API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const defaultOptions = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: mergedOptions.temperature,
          topK: mergedOptions.topK,
          topP: mergedOptions.topP,
          maxOutputTokens: mergedOptions.maxOutputTokens,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error Response:', errorData);
      throw new Error(errorData.error?.message || 'Failed to generate content');
    }

    const data = await response.json();
    console.log('Gemini API Success Response:', data);
    return data.candidates[0].content.parts[0].text || '';
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      console.error('Gemini API Error:', error);
    } else {
      toast.error('An unexpected error occurred');
      console.error('Unexpected Gemini API Error:', error);
    }
    return '';
  }
}

export async function generatePresentation(
  apiKey: string,
  topic: string,
  slides: number = 5,
  details: string = ''
) {
  const prompt = `
    Create a professional presentation about "${topic}" with ${slides} slides.
    ${details ? `Additional context: ${details}` : ''}
    
    Format the response as a structured JSON with the following format:
    {
      "title": "Main presentation title",
      "subtitle": "Optional subtitle",
      "slides": [
        {
          "title": "Slide title",
          "content": "Slide content in markdown format",
          "notes": "Speaker notes for this slide",
          "imagePrompt": "A detailed description for Unsplash to find a relevant image for this slide"
        }
      ]
    }
    
    IMPORTANT FORMATTING INSTRUCTIONS:
    1. Make each slide title clear and concise
    2. For bullet points, use proper markdown format:
       * Use a dash or asterisk followed by a space (- or *) at the start of each line
       * Do NOT manually add bullet symbols like •
    3. Structure content with clear headings and subheadings
    4. For emphasis, use markdown bold (**text**) but DO NOT include the asterisks in the final text
    5. Keep slide content concise to prevent overflow when displayed
    6. If including a numbered list, use proper numbering format: 1., 2., etc.
    7. Separate paragraphs with blank lines
    8. Make sure imagePrompt is descriptive enough to find good relevant images
    
    Be particularly careful with the JSON format and ensure it is valid and complete.
    No markdown formatting outside the JSON, just return a valid JSON object.
  `;

  try {
    // Increase token limit and lower temperature for more structured responses
    const response = await generateContent(apiKey, prompt, {
      temperature: 0.5,
      maxOutputTokens: 8000, // Significantly increased token limit for more detailed presentations
    });

    console.log("Raw API response:", response); // Debug the response

    // Enhanced JSON extraction with multiple fallbacks
    let jsonData;
    try {
      // Try to parse the entire response first
      jsonData = JSON.parse(response);
      console.log("Successfully parsed JSON directly");
    } catch (err) {
      console.error('Initial JSON parse error:', err);
      
      // If that fails, try to extract JSON from the response using regex
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || 
                        response.match(/```\n([\s\S]*?)\n```/) || 
                        response.match(/{[\s\S]*"title"[\s\S]*"slides"[\s\S]*}/);
                      
      if (jsonMatch && jsonMatch[1]) {
        try {
          jsonData = JSON.parse(jsonMatch[1]);
          console.log("Successfully parsed JSON from code block");
        } catch (e) {
          console.error('Error parsing extracted JSON from first capture group:', e);
          
          // Try parsing the entire match
          try {
            jsonData = JSON.parse(jsonMatch[0]);
            console.log("Successfully parsed JSON from entire match");
          } catch (e2) {
            console.error('Error parsing entire JSON match:', e2);
            
            // Try cleaning up the JSON string
            try {
              const cleanedJson = jsonMatch[0]
                .replace(/```json\n/, '')
                .replace(/```\n/, '')
                .replace(/\n```/, '')
                .trim();
              jsonData = JSON.parse(cleanedJson);
              console.log("Successfully parsed JSON after cleanup");
            } catch (e3) {
              console.error('Error parsing cleaned JSON:', e3);
              throw new Error('Failed to parse presentation data from response');
            }
          }
        }
      } else if (jsonMatch) {
        try {
          // Try to parse the entire match if the capture group is not available
          jsonData = JSON.parse(jsonMatch[0]);
          console.log("Successfully parsed JSON from match without groups");
        } catch (e) {
          console.error('Error parsing matched JSON:', e);
          
          // One last attempt - try to extract just the JSON part manually
          try {
            const potentialJson = response.substring(
              response.indexOf('{'),
              response.lastIndexOf('}') + 1
            );
            jsonData = JSON.parse(potentialJson);
            console.log("Successfully parsed JSON by manual extraction");
          } catch (e2) {
            console.error('Error parsing manually extracted JSON:', e2);
            throw new Error('Failed to parse presentation JSON from response');
          }
        }
      } else {
        // If no JSON-like content was found, try one last manual extraction
        try {
          const potentialJson = response.substring(
            response.indexOf('{'),
            response.lastIndexOf('}') + 1
          );
          jsonData = JSON.parse(potentialJson);
          console.log("Successfully parsed JSON by last-resort manual extraction");
        } catch (e) {
          console.error('Error on last-resort parsing:', e);
          throw new Error('No valid JSON format found in the response');
        }
      }
    }

    // Clean up the slide content to ensure proper formatting
    if (jsonData && jsonData.slides) {
      jsonData.slides = jsonData.slides.map((slide: any) => {
        // Clean up any double asterisks that might remain in the content
        if (slide.content) {
          slide.content = slide.content.replace(/\*\*([^*]+)\*\*/g, '$1');
        }
        return slide;
      });
    }

    // Validate the structure of the parsed JSON
    if (!jsonData || !jsonData.title || !Array.isArray(jsonData.slides)) {
      console.error('Invalid presentation structure:', jsonData);
      throw new Error('Generated presentation is incomplete or has an invalid format');
    }

    console.log("Validated and returning JSON:", jsonData);
    return jsonData;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Presentation generation failed: ${error.message}`);
    } else {
      toast.error('Failed to generate presentation');
    }
    console.error('Error generating presentation:', error);
    throw error;
  }
}

// New function to generate AI content for specific slides
export async function generateSlideContent(
  apiKey: string,
  topic: string,
  slideType: 'title' | 'content' | 'notes' | 'imagePrompt'
) {
  let prompt = '';
  
  switch (slideType) {
    case 'title':
      prompt = `Generate a creative and engaging title for a slide about "${topic}". Return just the title text.`;
      break;
    case 'content':
      prompt = `Generate concise and informative content for a slide about "${topic}". Include 3-5 bullet points or a short paragraph. Return just the content.`;
      break;
    case 'notes':
      prompt = `Generate helpful speaker notes for a slide about "${topic}". Include key talking points and additional context. Return just the notes.`;
      break;
    case 'imagePrompt':
      prompt = `Generate a detailed image description about "${topic}" that could be used to search for a relevant image. Make it specific and visual. Return just the description.`;
      break;
  }
  
  try {
    const response = await generateContent(apiKey, prompt, {
      temperature: 0.7,
      maxOutputTokens: 2000,
    });
    
    return response;
  } catch (error) {
    console.error(`Error generating ${slideType}:`, error);
    throw error;
  }
}

// New function to generate follow-up slides for an existing presentation
export async function generateFollowUpSlides(
  apiKey: string,
  existingPresentation: any,
  numberOfSlides: number = 3
) {
  // Extract key information from existing presentation
  const { title, subtitle, slides } = existingPresentation;
  
  // Create a summary of existing slides to help with continuity
  const slideSummary = slides.map((slide: any, index: number) => 
    `Slide ${index + 1}: ${slide.title} - ${slide.content.substring(0, 100)}...`
  ).join('\n');
  
  const prompt = `
    Continue an existing presentation titled "${title}" ${subtitle ? `with subtitle "${subtitle}"` : ''}.
    
    The existing presentation has ${slides.length} slides:
    ${slideSummary}
    
    Generate ${numberOfSlides} additional slides that logically continue from where the presentation left off.
    Maintain the same style, tone, and format as the existing slides.
    Ensure good flow and continuity with what has already been presented.
    
    Format the response as a structured JSON with only the new slides:
    {
      "slides": [
        {
          "title": "New slide title",
          "content": "New slide content",
          "notes": "Speaker notes for this slide",
          "imagePrompt": "A detailed description for finding a relevant image"
        }
      ]
    }
    
    Make sure to return only valid JSON with no extra text or formatting.
  `;
  
  try {
    const response = await generateContent(apiKey, prompt, {
      temperature: 0.6,
      maxOutputTokens: 6000,
    });
    
    // Parse the JSON response
    let jsonData;
    try {
      jsonData = JSON.parse(response);
    } catch (err) {
      // Apply same JSON extraction fallbacks as in generatePresentation
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || 
                       response.match(/```\n([\s\S]*?)\n```/) || 
                       response.match(/{[\s\S]*"slides"[\s\S]*}/);
      
      if (jsonMatch && jsonMatch[1]) {
        jsonData = JSON.parse(jsonMatch[1]);
      } else if (jsonMatch) {
        jsonData = JSON.parse(jsonMatch[0]);
      } else {
        // Manual extraction
        const potentialJson = response.substring(
          response.indexOf('{'),
          response.lastIndexOf('}') + 1
        );
        jsonData = JSON.parse(potentialJson);
      }
    }
    
    if (!jsonData || !Array.isArray(jsonData.slides)) {
      throw new Error('Invalid follow-up slides format');
    }
    
    return jsonData;
  } catch (error) {
    console.error('Error generating follow-up slides:', error);
    throw error;
  }
}
