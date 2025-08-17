"use client";

import React from 'react';
import { Github } from 'lucide-react';

export function ProjectShowcase() {
  const projects = [
    {
      name: 'Shell Assistant',
      event: 'IEEE Hacksagon 2025, IIITM Gwalior - Overall Software Category Winner',
      description: 'A local application that interprets natural language commands and executes them on a Linux/macos system.',
      url: 'https://github.com/ego1s1/shell-assist',
      githubUrl: 'https://github.com/ego1s1/shell-assist',
      icon: '󰆍',
      color: 'var(--mauve)',
    },
    {
      name: 'Gate Entry',
      description: 'A modern gate entry management system built with Next.js 14, featuring role-based access control and visitor tracking.',
      url: 'https://gate-entry-sigma.vercel.app/',
      githubUrl: 'https://github.com/ego1s1/gate-entry',
      icon: '󰉋',
      color: 'var(--teal)',
    },
    {
      name: 'YatraGPT',
      event: 'finova SoftLaunch Hackathon 2025 - 2nd Prize',
      description: 'An AI powered personalised travel agent that provides intelligent travel recommendations and planning assistance.',
      url: 'https://github.com/vee1e/finova',
      githubUrl: 'https://github.com/vee1e/finova',
      icon: '󰒋',
      color: 'var(--blue)',
    },
    {
      name: 'More to come',
      description: 'Exciting projects in development. Stay tuned for more innovative solutions and collaborations.',
      url: 'https://github.com/ego1s1',
      githubUrl: 'https://github.com/ego1s1',
      icon: '󰐊',
      color: 'var(--green)',
    },
  ];

  return (
    <div className="space-y-4 px-5 py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const cardContent = (
            <>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"
                style={{ backgroundColor: project.color }}
              />
              <div className="relative flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  <span 
                    className="font-['JetBrainsMono_Nerd_Font'] text-xl transition-colors duration-300"
                    style={{ color: project.color }}
                  >
                    {project.icon}
                  </span>
                  <h3 
                    className="font-mono text-base transition-colors duration-300"
                    style={{ color: project.color }}
                  >
                    {project.name}
                  </h3>
                </div>
                {project.githubUrl && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="hover:scale-110 transition-transform duration-200 bg-transparent border-none cursor-pointer p-0"
                  >
                    <Github 
                      className="size-4 opacity-50 group-hover:opacity-100 transition-all duration-300" 
                      style={{ color: project.color }}
                    />
                  </button>
                )}
              </div>
              {project.event && (
                <p className="text-xs text-muted-foreground mb-2">
                  {project.event}
                </p>
              )}
              <p className="relative text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                {project.description}
              </p>
            </>
          );

          return project.url ? (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative h-full p-4 rounded-lg border border-border transition-all duration-300"
            >
              {cardContent}
            </a>
          ) : (
            <div
              key={project.name}
              className="group block relative h-full p-4 rounded-lg border border-border transition-all duration-300"
            >
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
} 