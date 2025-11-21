# Orbit CMS — Project Scope Document

## 1. Overview

Orbit CMS is a multi-tenant, API-driven content management platform designed to manage multiple websites from a single administrative interface. It serves as the foundation of a larger ecosystem of microservices (bookings, inventory, AI assistants, etc.), but the core CMS focuses on structured content delivery, tenant isolation, and extensibility.

The system is built using:

* **Backend:** NestJS + Prisma + PostgreSQL/Supabase
* **Frontend Admin:** Next.js (admin panel)
* **Content Delivery:** REST API consumed by multiple websites
* **Storage:** S3-compatible object storage for media

---

## 2. Purpose of Orbit CMS

The CMS aims to:

* Centralize website content management for multiple client sites
* Reduce manual development overhead for content updates
* Provide a flexible data structure that adapts to different frontend architectures
* Serve as the "core hub" that future services orbit around (AI bots, bookings, e-commerce, etc.)
* Demonstrate engineering ability and architectural design for career and business opportunities

Orbit focuses on developer productivity, scalability, and low hosting overhead.

---

## 3. Core Functional Scope

### 3.1 Multi-Tenancy

* Each tenant represents a customer or business
* Tenants can own one or multiple websites
* All API responses must be isolated by tenant scope
* Authentication tokens contain tenant context

### 3.2 Website Management

* API endpoints for creating, reading, updating, and deleting websites
* Each website includes metadata (domain, handle, settings)
* Frontends use the website ID to fetch content

### 3.3 Content Management

* CRUD for structured content entries using JSON fields
* Keys represent content sections (e.g., `header`, `footer`, `home.hero`)
* Locale support for multilingual content
* Versioning built-in for later rollback capabilities
* Flexible content schema allowing each website to define its own structure

### 3.4 Media Management

* Upload signed URLs for media (images, documents, etc.)
* Store metadata: MIME type, size, path, and any custom information

### 3.5 Authentication & Authorization

* User accounts with roles (admin, editor)
* JWT authentication for API access
* Permissions enforced by role and tenant scope

### 3.6 Content Delivery to Websites

* Frontend applications fetch content through REST endpoints
* Websites poll the API for updates:

  * `/sync` endpoint returns changed keys + version numbers
  * Updated content fetched in bundles or individually

---

## 4. Future (Out-of-Scope for MVP)

These features are intentionally excluded from the first release but will be integrated as separate microservices:

* Booking & appointment systems
* Inventory / stock management
* AI content assistant service
* Automated SEO optimization
* Detailed audit logs and analytics dashboards
* Webhooks or pub/sub for real-time updates
* Advanced RBAC with granular permissions
* Billing system for tenants

These are planned, but not part of the MVP scope.

---

## 5. Non-Goals

* Not intended to be a WordPress-style page builder
* Not a drag-and-drop layout system
* Does not render frontend pages itself (headless only)
* Not meant to replace frameworks like Strapi or Sanity for general use

Orbit is a **purpose-driven, developer-centric CMS tailored to specific websites**, not a generic CMS platform.

---

## 6. Constraints

* Hosting costs should remain minimal during early development
* Polling is preferred over webhooks for MVP simplicity
* Database schema must support flexible content without breaking structure
* Security is mandatory: all CRUD operations must require authentication

---

## 7. Assumptions

* All frontends using Orbit will be built in Next.js
* Users are trusted internal administrators or developers
* Tenants expect fast, reliable content management but not guaranteed real-time updates
* Future microservices will communicate with Orbit via internal API or gateway

---

## 8. Success Criteria

Orbit CMS is considered successful if:

* Multiple websites can reliably fetch content from Orbit
* Admins can manage content without code changes
* Tenants are properly isolated and secure
* The system is stable enough for commercial usage
* It serves as a showcase of technical ability for engineering roles

---

## 9. Summary

Orbit CMS provides a scalable foundation for managing multi-tenant websites through a robust API and flexible content model. While simple at first, its architecture is intentionally designed for long-term growth, microservice expansion, and AI-driven automation. This scope document outlines what Orbit **is**, **is not**, and **will become** as the platform evolves.
