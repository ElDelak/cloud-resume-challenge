# Frontend Technical Specification

- Create a static web site that serves an html resume.

## Resume Format Considerations 

I live in Canada and resumes in word/pdf format are suppose to exclude information that can be use to be discrimitive. 

In canada we use a similar format of resume common in the US.


I'm going to use the [Harvard Resume Template format](https://careerservices.fas.harvard.edu/channels/create-a-resume-cv-or-cover-letter/#uc_resource_tiles-4) as the basis of my resume.


### Harvard Resume Format Generation 

I know how HTML very well, so I'm going let GenAI do the heavy lifting
and generate out html HTML and possibly CSS and from there I will manually refactor the code
to my preferred standard.

Prompt to ChatGPT 5:

```text
Convert this resume format into html.
Please don't use a css framework.
Please use the least amount of css tags
```

Image provided to LLM:
![](./docs/harvard-resume-format.jpg)

This is [generated output](./docs/nov-22-2025-resume-minimal.html) which I will refactor.

This is what the generated HTML looks like unaltered:

![](./docs/resume-minimal-rendered.jpg)

## HTML Adjustments

- UTF8 will support most langauges, I plan to use English and Japanese so we'll leave this meta tag in.
- Because we will be applying mobile styling to our website  we'll include the viewport meta tag width=device-width so mobile styling scales normally.
- We'll extract our styles into its own stylesheet after we are happy with our HTML markup
- We'll simplfy our HTML markup css selector to be as minimal as possible.
- For the HTML page I'll use soft tabs two spaces because I mostly code in Ruby and that's the standard tab format.