"use client";

import { useState } from "react";

import { Column, H1, Phrase, Row, Switch } from "@/components";
import { Dictionary } from "@/dictionaries";

type AreYouPrivilegedProps = {
  dict: Dictionary;
};

export const AreYouPrivileged = ({ dict }: AreYouPrivilegedProps) => {
  const questions = [
    {
      text: dict["My parents or guardians read to me when I was a child"],
      weight: 5,
    },
    {
      text: dict["I have to take annual leave for my religious holidays"],
      weight: -5,
    },
    {
      text: dict["English is my first language"],
      weight: 5,
    },
    {
      text: dict["I drive a new car"],
      weight: 5,
    },
    {
      text: dict["I have a designer handbag"],
      weight: 5,
    },
    {
      text: dict[
        "I feel confident that someone in my close circle would be able to financially help if I was going through a financial hardship"
      ],
      weight: 5,
    },
    {
      text: dict["I live in rented accommodation"],
      weight: -5,
    },
    {
      text: dict[
        "I see members of my race, ethnic group, gender or sexual orientation negatively portrayed on TV"
      ],
      weight: -5,
    },
    {
      text: dict["I have an illness or disability"],
      weight: -5,
    },
    {
      text: dict["I am a carer"],
      weight: -5,
    },
    {
      text: dict["I think twice about calling the police when trouble occurs"],
      weight: -5,
    },
    {
      text: dict["I have never been stopped and searched by the police"],
      weight: 10,
    },
    {
      text: dict[
        "I do most of my food shopping at Waitrose or Marks and Spencer"
      ],
      weight: 5,
    },
    {
      text: dict["I am a white male"],
      weight: 15,
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(false));

  const weights = questions.map((q) => q.weight);
  const maxScore = weights.filter((w) => w > 0).reduce((a, b) => a + b, 0);
  const minScore = weights.filter((w) => w < 0).reduce((a, b) => a + b, 0);

  const handleSwitchChange = (index: number, val: boolean) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = val;
      return newAnswers;
    });
  };

  const score = answers.reduce(
    (sum, answered, idx) => sum + (answered ? questions[idx].weight : 0),
    0
  );

  const normalizedScore = ((score - minScore) / (maxScore - minScore)) * 100;

  const getVerdict = (score: number) => {
    if (score <= minScore + 10) return dict["Very underprivileged"];
    if (score < 0) return dict["Underprivileged"];
    if (score === 0) return dict["Neutral"];
    if (score < maxScore / 2) return dict["Somewhat privileged"];
    if (score < maxScore - 10) return dict["Privileged"];
    return dict["Very privileged"];
  };

  return (
    <div className="mx-auto max-w-6xl p-8">
      <H1>{dict["Are you privileged?"]}</H1>
      <Phrase className="mb-8 font-semibold">
        {
          dict[
            "Check your level of privilege, according to Westminster City Council"
          ]
        }
      </Phrase>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Row key={index} className="items-center justify-between">
            <Column>
              <Row>
                <span className="text-primary-500 mr-2">{index + 1}.</span>
                {question.text}
              </Row>
            </Column>
            <Column className="ml-4 flex items-center">
              <Row>
                <Switch
                  name={`question-${index}`}
                  checked={answers[index]}
                  onChange={(val) => handleSwitchChange(index, val)}
                />
                <span className="ml-2 w-3">
                  {`${question.weight > 0 ? "+" : ""}${question.weight}`}
                </span>
              </Row>
            </Column>
          </Row>
        ))}
      </div>
      <div className="mt-8">
        <Row className="text-primary-500 justify-between">
          <Phrase>{dict["Least privileged"]}</Phrase>
          <Phrase>{dict["Most privileged"]}</Phrase>
        </Row>
        <div className="bg-primary-200 relative h-4 w-full rounded-full">
          <div
            className={`
              absolute h-full rounded-full bg-gradient-to-r from-blue-300
              to-blue-700
            `}
            style={{ width: `${normalizedScore}%` }}
          />
          <div
            className={`
              absolute inset-0 flex items-center justify-center text-sm
              font-semibold text-white
            `}
          >
            {score}
          </div>
        </div>
        <Phrase className="mt-2 text-center text-lg font-medium">
          <span className="font-bold">{getVerdict(score)}</span>
        </Phrase>
      </div>
    </div>
  );
};
