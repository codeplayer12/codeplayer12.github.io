---
# Copy this file into _posts/ and rename it: YYYY-MM-DD-box-name.md
# (Files in _templates/ are never published.)
title: "BoxName — Hack The Box Writeup"
summary: "One sentence on the attack path, e.g. SQL injection to foothold, then a misconfigured sudo rule to root."
tags: [htb, CTF, linux]
category: writeup
---

| | |
|---|---|
| Platform | Hack The Box (retired) |
| Difficulty | Easy |
| OS | Linux |
| Skills | Enumeration, … |

## Summary

Two or three sentences on the full chain, so a reader knows what they're about to learn.

## Enumeration

```bash
$ nmap -sC -sV -oA nmap/initial 10.10.10.10
```

What the scan showed and what you decided to look at first.

## Foothold

How you got in. Explain the *why*, not just the commands.

## Privilege escalation

How you got to root or SYSTEM.

## Lessons learned

- What you'd do faster next time
- How a defender could have spotted or stopped this
