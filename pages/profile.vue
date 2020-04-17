<template>
  <div>
    <navbar-component></navbar-component>
    <main class="profile-page">
      <section class="relative block" style="height: 500px;">

        <div
          class="absolute top-0 w-full h-full bg-purple-900"
          style="background-image: linear-gradient(90deg, rgba(81,60,127,1) 0%, rgba(201,67,126,1) 100%);"
        ></div>
        <div
          class="absolute top-0 w-full h-full"
          style="background-size: 100%; background-repeat: no-repeat;"
          :style="{'background-image': 'url(' + require('~/assets/img/register_bg_2.png') + ')'}"
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-25 bg-black"
          ></span>
        </div>
        
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px; transform: translateZ(0px);"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-800 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-gray-800">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-gray-300 w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div
                  class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                >
                  <div class="relative">
                    <img
                      alt="..."
                      src="~/assets/img/Silhouette.png"
                      class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style="max-width: 150px;"
                    />
                  </div>
                </div>
                <div
                  class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
                >
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style="transition: all 0.15s ease 0s;"
                    >
                      Interested
                    </button>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <a
                      class="bg-gray-800 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      href="/search"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <i class="fas fa-arrow-left mr-2 text-lg text-gray-500"></i>
                      Back
                    </a>
                    <!--
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                        >22</span
                      ><span class="text-sm text-gray-500">Hires</span>
                    </div>
                    -->
                  </div>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3
                  class="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                >
                  Senior Software Developer
                </h3>
                <div
                  class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                  Houghton-le-Spring, Sunderland
                </div>
              </div>
              <div class="mt-10 py-10 border-t border-gray-300 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <a name="overview"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                    >
                      Overview
                    </h4>
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      I currently work as a senior software engineer at a firm in the North East of England. 
                      I have several years of experience with both software development and research.
                      In the past I have filled my spare time by consulting as a researcher in Technology Enhanced Learning 
                      and as part of that work have worked with several organisations including Bede’s World Museum, 
                      the British Museum, TLRP, Evidence Based Education and Durham University’s School of Education. 
                      I take pride in what I do and enjoy producing high-quality work..
                    </p>

                    <a name="skills"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                    >
                      Main Skills / Area of Expertise
                    </h4>
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      Experienced Software Developer - In my current and past roles working in commercial entities I have utilised numerous technologies such as Angular2+, TypeScript, JavaScript, CSS, Docker, HTML5, AWS, NodeJS, .NET, C#, MVC, Postgrs, MSSQL, PHP, MySQL, Java, REST and Tableau. I have worked mostly as a full-stack developer in the past. I also have some Dev Ops experience having produced the CI process for automating testing and deployment for several past projects.
                      <br /><br />
                      Understanding of User Interaction - The majority of my past roles have involved working around user interaction. In my roles working for commercial enterprises I have been involved in the development of the front-end of interactive reporting and other web-based systems. Prior to this I worked as a researcher in human-computer interaction. This work was prefaced by my MSc which was focused on user interactions.
                      <br /><br />
                      Team Worker - I currently as a member of a product orientated team and in my prior roles worked concurrently as part of several project-orientated teams. As part of working in a team I ensure that my code is readable, commented and fully documented and regularly engage in knowledge transfers. 
                      <br /><br />
                      Agile - As part of a past role I have completed scrum-master training to better support the use of Agile-methodologies. I currently work as part of a team that uses the Kanban methodology.
                      <br /><br />
                      Motivated - In my spare time I provide a Technology Enhanced Learning research consultancy service. As part of this work I have been involved as a major contributor in several projects for a number of organisations including Bede’s World Museum, the British Museum and Evidence Based Education. Most recently I have worked with Durham University's Technology Enhanced Special Interest Group where I contributed to several significant studies and publications.
                      <br /><br />
                      Clear and concise communicator - I have received commendations for my documentation abilities and presentation skills. I have had several papers accepted into academic journals and have received an award for a presentation I gave on my MSc at my university department’s research day event.
                      <br /><br />
                      Problem Solver with the drive and ability to quickly learn new skills - I have been required to learn a wide range of technologies, platforms and concepts quickly for various projects with short time scales throughout my career so far. I am proud to say that I have been able to successfully deliver for all these projects using what I have learnt.
                    </p>

                    <a name="experience"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                    >
                      Commercial Experience
                    </h4>
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      Senior Software Engineer - Commercial Software Firm (January 2020 to present)
                      <br />
                      In this role, in addition to the responsibilities of software development, I carry the responsibility of improving confidence in our products’ reliability and accessibility. I carry several Dev Ops responsibilities such as the creation and maintenance of continuous integration pipelines which automate the testing and deployment of my team’s work. I am also involved in the design of solution architectures and the creation of communities of practice for use across the team.
                      <br /><br />
                      Software Engineer - Commercial Software Firm (October 2018 to January 2020)
                      <br />
                      In this role I was responsible for the development of high-quality web sites and applications using modern technologies such as NodeJS, Angular2+, Docker and AWS. I operated as part of several different software teams utilising the Kanban agile methodology. 
                      <br /><br />
                      Data Visualisation Analysis Developer - Not-for-profit Commercial Software Firm (April 2016 to October 2018)
                      <br />
                      In this role I was responsible for the design and production of systems capable of creating reports on demand. I worked with several different technologies for these systems, such as JavaScript, PHP, Tableau and Excel. I operated in both the report design and software implementation teams to ensure the reports produced by these systems were well suited to the company’s wide and varied audience of international customers. During this time I also operated as the scrum master for several software teams.
                      <br /><br />
                      Business Analysis Developer - Not-for-profit Commercial Software Firm (June 2013 to April 2016)
                      <br />
                      My key responsibility in this role was to develop clear and accurate data visualisations for various systems and data sources using the Tableau software suite. I also had several additional responsibilities in this role including the development of mobile applications, the maintenance of .NET generated web sites and the development of Virtual Learning Environment technologies.
                      <br /><br />
                      Research Associate - University Research Group (September 2011 to June 2013)
                      <br />
                      My key responsibilities in this role were to develop software and hardware utilising emerging technologies in the field of education and produce research outputs based on these developments. The emerging technologies I worked with were mostly Natural User Interfaces, specifically multi-touch, but also included other recent innovations such as 3D scanners and 3D printers. In addition to these responsibilities I was also in charge of organising and managing studies in our classroom-environment laboratory. This involved ensuring rich data was collected during the studies, such as video and audio, and stored securely in line with data protection legislation. As part of this role I was also the analysis of the data captured which involved the further development of supporting software.
                      <br /><br />
                      Freelance Researcher - Nationwide Research Group (March 2011 to July 2011)
                      <br />
                      During my masters I was contracted by a nation-wide research group to produce and present a multi-touch system for classroom use by early-years students. I worked on this for several months in parallel with completing my masters. I am pleased to say that the completed work was well received by both the programme and those who saw it presented.
                      <br /><br />
                      Demonstrator - University (October 2009 to April 2010)
                      <br />
                      My key responsibility in this role was to assist undergraduate computer science graduates in practical classes. During this time I also presented projects and aided activities on open-days for the department.
                    </p>

                    <a name="qualifications"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                    >
                      Relevant Qualifications
                    </h4>
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      Computer Science MSc by research (Sep 2009 to Jun 2011) - Durham University<br />
                      Computer Science BSc (2:1 Hons) (Sep 2006 to Jul 2009) - Durham University<br />
                      Computer Science cCE (Sep 2005 to Mar 2006) - Teesside University<br />
                      A-Level: Computing (B), Electronics (A), Physics (B) (Sep 2003 to Jul 2005)<br />
                      AVCE: ICT (A) <br />
                      AS-Level: Maths (A)
                    </p>

                    <a name="qalifications"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                    >
                      Personal Websites
                    </h4>
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      <a href="http://leighton.com/" target="_blank">leighton.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavbarComponent from "~/components/Navbar.vue";
import FooterComponent from "~/components/Footer.vue";

export default Vue.extend({
  components: {
    NavbarComponent,
    FooterComponent
  }
})

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>
