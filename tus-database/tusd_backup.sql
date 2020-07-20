--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 12.0

-- Started on 2020-07-01 14:12:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

--
-- TOC entry 212 (class 1259 OID 24587)
-- Name: app_role; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.app_role (
    role_id bigint NOT NULL,
    role_name character varying(30) NOT NULL
);


ALTER TABLE public.app_role OWNER TO tusadmin;

--
-- TOC entry 211 (class 1259 OID 24580)
-- Name: app_user; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.app_user (
    user_id bigint NOT NULL,
    user_name character varying(36) NOT NULL,
    encryted_password character varying(128) NOT NULL,
    enabled integer NOT NULL
);


ALTER TABLE public.app_user OWNER TO tusadmin;

--
-- TOC entry 208 (class 1259 OID 16606)
-- Name: key_seq; Type: SEQUENCE; Schema: public; Owner: tusadmin
--

CREATE SEQUENCE public.key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.key_seq OWNER TO tusadmin;

--
-- TOC entry 214 (class 1259 OID 24611)
-- Name: persistent_logins; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.persistent_logins (
    username character varying(64) NOT NULL,
    series character varying(64) NOT NULL,
    token character varying(64) NOT NULL,
    last_used timestamp without time zone NOT NULL
);


ALTER TABLE public.persistent_logins OWNER TO tusadmin;

--
-- TOC entry 196 (class 1259 OID 16524)
-- Name: tauthgroup; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tauthgroup (
    groupid character(10) NOT NULL,
    groupname character varying(256) NOT NULL,
    vontim timestamp without time zone NOT NULL,
    bistim timestamp without time zone NOT NULL
);


ALTER TABLE public.tauthgroup OWNER TO tusadmin;

--
-- TOC entry 197 (class 1259 OID 16527)
-- Name: tauthprofattr; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tauthprofattr (
    userid character(10) NOT NULL,
    attrname character varying(64) NOT NULL,
    attrwert character varying(256) NOT NULL,
    vontim timestamp without time zone NOT NULL,
    bistim timestamp without time zone NOT NULL
);


ALTER TABLE public.tauthprofattr OWNER TO tusadmin;

--
-- TOC entry 198 (class 1259 OID 16530)
-- Name: tauthuser; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tauthuser (
    userid character(10) NOT NULL,
    username character varying(256) NOT NULL,
    password character varying(256),
    vontim timestamp without time zone NOT NULL,
    bistim timestamp without time zone NOT NULL
);


ALTER TABLE public.tauthuser OWNER TO tusadmin;

--
-- TOC entry 199 (class 1259 OID 16536)
-- Name: tauthuser2group; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tauthuser2group (
    groupid character(10) NOT NULL,
    userid character(10) NOT NULL,
    vontim timestamp without time zone NOT NULL,
    bistim timestamp without time zone NOT NULL
);


ALTER TABLE public.tauthuser2group OWNER TO tusadmin;

--
-- TOC entry 201 (class 1259 OID 16568)
-- Name: tdict; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tdict (
    id bigint NOT NULL,
    var smallint NOT NULL,
    entry character varying(255) NOT NULL
);


ALTER TABLE public.tdict OWNER TO tusadmin;

--
-- TOC entry 210 (class 1259 OID 16623)
-- Name: tdict_de; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tdict_de (
    id bigint NOT NULL,
    var smallint NOT NULL,
    entry character varying(255) NOT NULL
);


ALTER TABLE public.tdict_de OWNER TO tusadmin;

--
-- TOC entry 209 (class 1259 OID 16615)
-- Name: tdict_en; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tdict_en (
    id bigint NOT NULL,
    var smallint NOT NULL,
    entry character varying(255) NOT NULL
);


ALTER TABLE public.tdict_en OWNER TO tusadmin;

--
-- TOC entry 202 (class 1259 OID 16573)
-- Name: tlog; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tlog (
    id bigint NOT NULL,
    user_id bigint,
    at timestamp without time zone NOT NULL,
    log character varying(255) NOT NULL
);


ALTER TABLE public.tlog OWNER TO tusadmin;

--
-- TOC entry 203 (class 1259 OID 16578)
-- Name: tquest; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tquest (
    id bigint NOT NULL,
    user_id bigint,
    quest_no smallint NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    finished boolean NOT NULL
);


ALTER TABLE public.tquest OWNER TO tusadmin;

--
-- TOC entry 204 (class 1259 OID 16583)
-- Name: tslot; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tslot (
    id bigint NOT NULL,
    quest_id bigint NOT NULL,
    start timestamp without time zone NOT NULL,
    ende timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    ort smallint,
    primary_activity character varying(255),
    secondary_activity character varying(255),
    allein boolean,
    partner boolean,
    kind boolean,
    mitglied boolean,
    andere boolean,
    day date
);


ALTER TABLE public.tslot OWNER TO tusadmin;

--
-- TOC entry 205 (class 1259 OID 16591)
-- Name: tuser; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tuser (
    id bigint NOT NULL,
    username character varying(32) NOT NULL,
    password character varying(90) NOT NULL,
    day date NOT NULL,
    first_login timestamp without time zone NOT NULL,
    last_login timestamp without time zone NOT NULL,
    day2 date NOT NULL
);


ALTER TABLE public.tuser OWNER TO tusadmin;

--
-- TOC entry 206 (class 1259 OID 16596)
-- Name: tuser_info; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tuser_info (
    id bigint NOT NULL,
    user_id bigint,
    name character varying(64) NOT NULL,
    wert character varying(255) NOT NULL
);


ALTER TABLE public.tuser_info OWNER TO tusadmin;

--
-- TOC entry 200 (class 1259 OID 16563)
-- Name: tuser_wb; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.tuser_wb (
    id bigint NOT NULL,
    user_id bigint,
    wb smallint NOT NULL,
    later smallint NOT NULL
);


ALTER TABLE public.tuser_wb OWNER TO tusadmin;

--
-- TOC entry 207 (class 1259 OID 16601)
-- Name: twb; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.twb (
    id bigint NOT NULL,
    quest_id bigint NOT NULL,
    at timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    lucky_question smallint NOT NULL,
    relaxed_question smallint NOT NULL,
    like_question smallint NOT NULL,
    later_question boolean NOT NULL
);


ALTER TABLE public.twb OWNER TO tusadmin;

--
-- TOC entry 213 (class 1259 OID 24594)
-- Name: user_role; Type: TABLE; Schema: public; Owner: tusadmin
--

CREATE TABLE public.user_role (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.user_role OWNER TO tusadmin;

--
-- TOC entry 3525 (class 0 OID 24587)
-- Dependencies: 212
-- Data for Name: app_role; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.app_role (role_id, role_name) FROM stdin;
1	ROLE_ADMIN
2	ROLE_USER
\.


--
-- TOC entry 3524 (class 0 OID 24580)
-- Dependencies: 211
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.app_user (user_id, user_name, encryted_password, enabled) FROM stdin;
2	dbuser1	$2a$10$PrI5Gk9L.tSZiW9FXhTS8O8Mz9E97k2FZbFvGFFaSsiTUIl.TCrFu	1
1	dbadmin1	$2a$10$PrI5Gk9L.tSZiW9FXhTS8O8Mz9E97k2FZbFvGFFaSsiTUIl.TCrFu	1
\.


--
-- TOC entry 3527 (class 0 OID 24611)
-- Dependencies: 214
-- Data for Name: persistent_logins; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.persistent_logins (username, series, token, last_used) FROM stdin;
\.


--
-- TOC entry 3509 (class 0 OID 16524)
-- Dependencies: 196
-- Data for Name: tauthgroup; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tauthgroup (groupid, groupname, vontim, bistim) FROM stdin;
1         	Admin	2016-01-01 00:00:00	2999-12-31 00:00:00
2         	SachbearbeiterBpk	2016-01-01 00:00:00	2999-12-31 00:00:00
3         	Nutzer	2016-01-01 00:00:00	2999-12-31 00:00:00
\.


--
-- TOC entry 3510 (class 0 OID 16527)
-- Dependencies: 197
-- Data for Name: tauthprofattr; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tauthprofattr (userid, attrname, attrwert, vontim, bistim) FROM stdin;
\.


--
-- TOC entry 3511 (class 0 OID 16530)
-- Dependencies: 198
-- Data for Name: tauthuser; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tauthuser (userid, username, password, vontim, bistim) FROM stdin;
13        	tus_test1	36d00e9037667f668128b2ed42e8a894b3bad01371934bb71db3af1e4afeae29	2019-07-19 00:00:00	2999-12-31 23:59:59
14        	tus_test2	36d00e9037667f668128b2ed42e8a894b3bad01371934bb71db3af1e4afeae29	2019-10-16 14:34:40.908	2999-12-31 23:59:59
1563      	tus_test3	cc6a5dbfc84708d99a2338c98efbfdfffcd9ce3cb2f3f87219443e1095405149	2020-03-10 00:00:00	2999-12-31 00:00:00
1601      	tustestcbs1	0e3dc2298af6759ab20e6d34f5966a36d6f10dacc4c8808da76399d3dd56860d	2020-06-05 00:00:00	2999-12-03 00:00:00
1607      	tustestcbs2	fefc4a853a87be46a38044c690d166bbac8475ad2bcbf13c5ac6c40760de6c7a	2020-06-05 00:00:00	2999-12-03 00:00:00
1613      	tustestcbs3	8a105f1ff1219978fcf43b18988b1476a3c7b1aaee0a2834b12ad2793eb51273	2020-06-05 00:00:00	2999-12-03 00:00:00
1619      	tustestcbs4	21bf492ac62712dbaf64d3efca053ffb1d1d48cb557a4ebf69327af6d17ad18f	2020-06-05 00:00:00	2999-12-03 00:00:00
1625      	tustestcbs5	15b3d257619985b6c1fac978cd4473ff8645aaa7792f3a7dadb48fe70b01395b	2020-06-05 00:00:00	2999-12-03 00:00:00
1631      	tustestcbs6	11e9f194c9123c2ed5f2cb690b7f742590cc91639e8f14da95d289e79e6d380b	2020-06-05 00:00:00	2999-12-03 00:00:00
1637      	tustestcbs7	cc776b45ab051728896a07c1ee6f8314b01053af6f014c3d1a9dfd5bb0d5b214	2020-06-05 00:00:00	2999-12-03 00:00:00
1643      	tustestcbs8	02e5dc6aeca622092b8097864fbe1a0deb7ce1e89daf5ab0b04e554f23369287	2020-06-05 00:00:00	2999-12-03 00:00:00
1649      	tustestcbs9	ba67a8a3d42ba3a9da2dddb038eaa438c2f9b88968e6013ef7928c4aa3d16c58	2020-06-05 00:00:00	2999-12-03 00:00:00
1655      	tustestcbs10	45263689b7436d26f2b30eb7e2d779a1ceb3eb086252e7724e9fa7a47315d10c	2020-06-05 00:00:00	2999-12-03 00:00:00
1661      	userlabcbs@gmail.com1!	64f733e69783929eaae7026315b0cab41ae1a9bdfbb5927c51d8dd2f97883269	2020-06-05 00:00:00	2999-12-03 00:00:00
1667      	eniel.ninka@gmail.com1!	c13096bd2a29204a573eb6242686aedf372ab3b40207f51f1dc862a0690518eb	2020-06-05 00:00:00	2999-12-03 00:00:00
1673      	msbiggie16@gmail.com1!	279fbb281faa0e5002f8b328a96338c9019bb4f77f43688f68ca852d22cdcb10	2020-06-05 00:00:00	2999-12-03 00:00:00
1679      	elke.nagel@posteo.de1!	3dd8ffa9c808bad9102869d4d32a1679224dfd42566e3ab44e82a51362e56c24	2020-06-05 00:00:00	2999-12-03 00:00:00
1582      	tus_test4	69d71775593ff26b889390c5bc3ef30721e858789f34ada877954686b2481d23	2020-06-05 00:00:00	2999-12-31 00:00:00
1593      	tus_test5	75a4591ce178decd1014021449283d41ccdf77b19b44d615809cd4f2d1016df7	2020-06-05 00:00:00	2999-12-31 00:00:00
\.


--
-- TOC entry 3512 (class 0 OID 16536)
-- Dependencies: 199
-- Data for Name: tauthuser2group; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tauthuser2group (groupid, userid, vontim, bistim) FROM stdin;
3         	1         	2016-10-17 15:33:43.031	2019-10-17 15:33:43.031
\.


--
-- TOC entry 3514 (class 0 OID 16568)
-- Dependencies: 201
-- Data for Name: tdict; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tdict (id, var, entry) FROM stdin;
40	1	Having a nap
41	1	Nap
42	0	Sick in bed
43	0	Eating
44	0	Breakfast
45	0	Lunch
46	0	Dinner
47	0	Eating supper
48	0	Having a snack
49	0	Trinking Coffee
50	0	Snacking
51	0	Washing 
52	0	Brushing teeth
53	0	Changing clothes
54	0	Make-up
55	0	Manicure
56	0	Pedicure
57	0	Personal hygiene
58	0	Sauna
59	0	Shaving
60	0	Skin care
61	0	Taking a bath 
62	0	Taking a shower
64	0	Washed hands
65	0	Washed feets
66	0	Washing, drying hair
67	0	Doing hair care
68	0	Dressing
70	0	Went to doctor for check-up 
71	0	Doctor visited me at home 
73	0	Was at the hospital (as a patient)
74	0	Facial care
75	0	Piercing
77	0	was at the hairdresser
78	0	Other personal care
79	0	Taking medicine
80	0	Home diagnostic tests
82	0	Insulin injection
83	0	pills in a medicine cassette
84	0	Wound treatment
85	0	Couple relation
86	0	Sexual activities
87	0	Hugging
88	0	Intimacy 
89	0	Having Sex
90	0	Feet massage 
91	0	Massage
92	0	Monitoring blood pressure
93	0	Monitoring sugar level
95	0	Working at the job
96	0	Working at the office
97	0	Traveling with work
98	0	Conference related to the work
99	0	Lunch break in  job
100	0	Other activities related to employment
101	0	Seeking for a job
102	0	Changed clothes before/ after work at the place of work
103	0	Visiting a future workplace
104	0	Reading job announcements
105	0	Classes 
106	0	Lectures
107	0	At school
108	0	At university
109	0	Exams
110	0	School sports day
111	0	At the cinema, theatre with school
112	0	Preparing for a test
113	0	Homework
114	0	Studying together with a fellow pupil
115	0	Studying in the libary
117	0	Reading for an exam
118	0	Internship
119	0	unpaid internships
120	0	paid internships
121	0	Breaks at school/ university
122	0	Extracurricular classes
124	0	Free time study
125	0	household and family care
126	0	Food preparation and baking
127	0	Set the table 
128	0	Brewed coffee
129	0	Heated up some food
130	0	Made meals
131	0	Serving food for the others
132	0	Prepared a lunch box
133	0	Dish washing
134	0	Cleared the table after eating
135	0	Loaded/ unloaded the dishwasher
137	0	Cleaning dwelling
138	0	Vacuuming
139	0	Waxing floors
140	0	Cleaning the windows
141	0	making beds
142	0	arranging the home
143	0	Cleaning garden
144	0	Heating dwelling and water
145	0	Arranging household goods and materials
146	0	Recycling and disposal of waste
147	0	Other or unspecified household upkeep
148	0	Laundry
149	0	Ironing
150	0	Other textile care
151	0	Gardening
152	0	Tending domestic animals
153	0	Caring for pets
154	0	Walking the dog
155	0	Other gardening and pet care
157	0	Repairs to dwelling
158	0	Making, repairing and maintaining equipment
159	0	Vehicle maintenance
161	0	Shopping (including online/ e-shopping)
162	0	Commercial and administrative services
164	0	Household management
165	0	Physical care and supervision of child
166	0	Teaching the child
167	0	Reading with child
168	0	Playing with child
169	0	Talking with child
170	0	Accompanying child
171	0	Other childcare
172	0	Physical care of an adult household member
173	0	Other support to an adult household member
39	1	Snoozing
179	0	Help to an adult person of another household
180	0	Other/ unspecified informal help to another household
181	0	Meetings
182	0	Religious activities
197	0	Concerts
198	0	Art exhibitions and museums
199	0	Library
200	0	Attending live sports events
201	0	Zoos, botanical gardens, natural reserves, etc.
202	0	Other or unspecified entertainment and culture
203	0	Resting 
204	0	Relaxing
205	0	Time out
206	0	Walking 
207	0	Hiking
208	0	Jogging 
209	0	Running
210	0	Cycling
211	0	skiing 
212	0	skating
213	0	Ball games
214	0	Gymnastics 
218	0	Outdoor activities
219	0	Productive exercise (e.g. hunting, fishing, picking berries, mushrooms or herbs)
220	0	hunting
221	0	fishing
222	0	picking berries
223	0	picking  mushrooms 
224	0	collecting herbs
225	0	Sports related activities
226	0	Arts (visual, performing, literary)
227	0	Collecting
228	0	Making handicraft products
229	0	Other hobbies
230	0	Computing
231	0	Information search using internet
232	0	Other computing
233	0	Solo games and play, gambling
234	0	Parlour games and play
235	0	Computer games
236	0	Console games (on home console)
237	0	Mobile games (on handheld device/ smartphone)
238	0	Other or unspecified games
239	0	Reading periodicals
240	0	Reading neswpapers
241	0	Reading books
242	0	Reading
243	0	Watching TV
244	0	Watching video
245	0	Watching DVD
246	0	Listening to radio 
247	0	Listening to recordings
248	0	Listening to webradio
249	0	Travel to/ from work
250	0	Travel related to study
251	0	Travel related to shopping and services
252	0	Travel related to childcare
253	0	Travel related to other household care
254	0	Travel related to voluntary work and meetings
255	0	Travel related to social life
256	0	Travel related to other leisure
257	0	Travel related to changing locality
258	0	Other or unspecified travel purpose
259	0	Filling in the time use diary
260	0	Unspecified leisure time
261	0	Other unspecified time use
175	0	Construction and repairs as help
176	0	Help in employment and farming
177	0	Care of own children living in another household
178	0	Childcare as help to another household
183	0	Going to church
184	0	Mass
185	0	Visits to cemetery 
186	0	Grave care
187	0	Other or unspecified participatory activities
188	0	Socialising with family
189	0	 Visiting and receiving visitors
190	0	Celebrations
191	0	Audio and video conversation
192	0	Communication by text messaging (SMS, instant messages, email, etc.)
193	0	Time spent on social media
194	0	Other or unspecified social life
195	0	Cinema
196	0	Theatre
215	0	Physical exercises
216	0	Fitness
217	0	Water sports
38	1	Sleeping
63	0	Washed face
69	0	Personal care services
72	0	Waiting in the doctor’s waiting-room
76	0	Visited the maternity ward
81	0	Personal medical care at home
94	0	Working time in main and second job (including short breaks and travel at work)
116	0	Was tested on the homework
123	0	Other activities related to study
136	0	Storing, arranging, preserving food stocks
156	0	House construction and renovation
160	0	Other construction and repairs
163	0	Other shopping and services
174	0	Organisational work (work for or through an organisation)
\.


--
-- TOC entry 3523 (class 0 OID 16623)
-- Dependencies: 210
-- Data for Name: tdict_de; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tdict_de (id, var, entry) FROM stdin;
38	1	Nachtruhe
39	1	Schlafen
40	1	Aufstehen
41	1	Schlafen auch unter Tags bei Schichtarbeit
42	0	Mittagschlaf
43	0	Nickerchen
44	0	Im Bett wegen Krankheit
45	0	Zärtlichkeiten austauschen
46	0	mit Parnter kuscheln
47	0	Sex
48	0	Entspannen
49	0	Meditation
50	0	Nichtstun
51	0	Autogenes Training
52	0	Rauchpause
53	0	in der Sonne liegen
54	0	aus dem Fenster schauen
55	0	Aquarium betrachten
56	0	beten
57	0	Nichtstun wegen Krankheit
58	0	Hauptmahlzeiten
59	0	Frühstück
60	0	Mittagessen
61	0	Abendessen
62	0	Jause
63	0	Kaffeetrinken
64	0	Snack
65	0	Bier trinken
66	0	Glas Wein
67	0	Cocktails trinken
68	0	Eis essen
69	0	duschen
70	0	baden
71	0	WC
72	0	Zahnpflege
73	0	schminken
74	0	rasieren
75	0	Anziehen
76	0	umziehen
77	0	Kleidung vorbereiten
78	0	Haarpflege
79	0	Maniküre
80	0	Pediküre
81	0	Peeling
82	0	Beine rasieren
83	0	Haare färben
84	0	Medikamente nehmen
85	0	Blutdruck messen
86	0	Salbe einreiben
87	0	Verband wechseln
88	0	Sauna zu Hause
89	0	Solarium zu Hause
90	0	Dampfbad zu Hause
91	0	Präsenzdienst
92	0	Zivildienst
93	0	Termin in der Arbeit
94	0	Hauptberuf
95	0	geschäftliche Telefonate in der Arbeitszeit
96	0	geschäftliche Telefonate außerhalb der Arbeitszeit
97	0	Überstunden im Hauptberuf
98	0	"Vortrag, Seminar" im Zusammenhang mit Beruf außerhalb der Normalarbeitszeit
99	0	Wissenschaftliches Arbeiten zu Hause
100	0	Hefte korrigieren
101	0	Mittagspause
102	0	Essen in der Kantine
103	0	Kaffeepause
104	0	Nebenerwerbslandwirtschaft
105	0	Aushilfe im Geschäft
106	0	Nebenberufliche Arbeit
107	0	Ferialpraxis
108	0	Nachhilfe geben
109	0	Nachbarschaftshilfe mit Bezahlung
110	0	Schule
111	0	Universität
112	0	Deutschkurs
113	0	Abendschule
114	0	Vorlesung - Uni
115	0	Warten im Schulhof
116	0	Freistunde
117	0	Unterrichtspausen
118	0	Nachmittagsbetreuung in der Schule
119	0	Hort
120	0	Tagesheim
121	0	Reden mit Lehrerin
122	0	Reden mit Tutor
123	0	Backen
124	0	Konservieren von Nahrungsmitteln
125	0	Geschirr abwaschen
126	0	Aufräumen
127	0	reinigen
128	0	Fenster putzen
129	0	Müllentsorgung
130	0	Wäsche waschen
131	0	Wäsche bügeln
132	0	Gartenarbeiten
133	0	Versorgung von Pflanzen in der Wohnung
134	0	Fütterung von Nutztieren
135	0	Fütterung  von Haustieren
136	0	Mit dem Hund spazieren gehen
137	0	Möbel bauen
138	0	Möbel reparieren
139	0	Fahrzeugpflege (in Eigenarbeit)
140	0	Baumhaus bauen
141	0	Fahrzeugreparatur
142	0	Einkaufen
143	0	shoppen gehen
144	0	Hund bei Hundesitter abgeben
145	0	Pflege durch Krankenschwester
146	0	Planungsarbeiten im Haushalt
147	0	Einkaufsliste schreiben, Putzplan erstellen, Reise-, Festvorbereitungen
148	0	Familienfeier
149	0	Gespräche im Familienkreis
150	0	Telefonieren
151	0	Briefe schreiben
152	0	Briefe lesen
153	0	Post lesen
154	0	Tratschen
155	0	Plaudern
156	0	Krankenbesuch
157	0	Private Partys
158	0	Familienfeste
159	0	Treffen mit Freunden in Lokal
160	0	Körperpflege des Kindes
161	0	Baby füttern
162	0	Kind stillen
163	0	mit dem Kind kuscheln
164	0	Medizinische Versorgung des Kindes zu Hause
165	0	Beaufsichtigen des Kindes
166	0	Lernen mit dem Kind (für Schule)
167	0	Dem Kind etwas beibringen
168	0	Sprechen mit dem Kind
169	0	Kind vorlesen
170	0	Kind Geschichten erzählen
171	0	Spielen mit dem Kind
172	0	In den Schlaf singen
173	0	Elternversammlungen besuchen
174	0	Babyschwimmen
175	0	Begleitung des Kindes bei schulischen Aktivitäten
176	0	Partner, Partnerin aufwecken
177	0	Gemeinderatssitzung
178	0	Clubtreffen
179	0	Kino
180	0	Messe besuchen
181	0	Zoo, Shows
182	0	Besuch öffentlicher Feste
183	0	Besuch öffentlicher Veranstaltungen
184	0	Spazieren gehen
185	0	Stadtbummel
186	0	Friedhofsbesuch
187	0	Wandern
188	0	Bergsteigen
189	0	klettern
190	0	Laufen
191	0	Nordic Walking
192	0	Joggen
193	0	Radfahren als Sport
194	0	Skateboard fahren
195	0	Rollschuh fahren
196	0	Wintersport
197	0	Schifahren
198	0	Snowboard fahren
199	0	eislaufen
200	0	Ice Hockey spielen
201	0	Wassersport
202	0	Schwimmen
203	0	segeln
204	0	rudern
205	0	surfen
206	0	Wasserski fahren
207	0	ins Schwimmbad gehen
208	0	Ballsport
209	0	Fußball
210	0	Handball
211	0	Volleyball
212	0	Tennis
213	0	Golf
214	0	Bowling
215	0	Fitnessstudio
216	0	Aerobic
217	0	Rückengymnastik
218	0	Rückbildungsgymnastik
219	0	Qi Gong
220	0	Body Building
221	0	am Laufband laufen
222	0	Yoga
223	0	Pilates
224	0	Crossfitness
225	0	Motorsport
226	0	Reiten
227	0	Tanzen
228	0	Sportkurs
229	0	Kampfsport
230	0	fischen
231	0	jagen
232	0	Sammeln in der Natur
233	0	Schwammerl suchen
234	0	Pilze suchen
235	0	Heidelbeeren pflücken
236	0	Kräuter sammeln
237	0	aus dem Wald Holz holen
238	0	Reisig holen
239	0	Pferd für Ausritt vorbereiten
240	0	Rüstzeiten für sportliche Aktivitäten
241	0	umziehen im Fitnessstudio
242	0	Pferd striegeln
243	0	Musizieren
244	0	Klavier spielen
245	0	Gitarre spielen
246	0	Hausmusik machen
247	0	Karoke singen
248	0	Musik komponieren
249	0	mit der Band proben
250	0	Musikprobe
251	0	Malen
252	0	Zeichnen
253	0	Textilmalerei
254	0	Hinterglasmalerei
255	0	Window Color
256	0	Fotografieren
257	0	Filmen
258	0	Fotos am Computer bearbeiten
259	0	Basteln
260	0	Töpfern
261	0	Gedichte schreiben
262	0	Weihnachtsbasteleien
263	0	Blumengesteck binden
264	0	Briefmarken sammeln
265	0	Münzen sammeln
266	0	katalogisieren
267	0	Karten sammeln
268	0	Hobbysammlung pflegen
269	0	Stickerablum einkleben
270	0	Figuren sammeln
271	0	Programmieren
272	0	Programme installieren
273	0	Programme laden
274	0	Elektronische Geräte reparieren
275	0	Modellbau
276	0	funken
277	0	chemische Experimente
278	0	Fotos einkleben
279	0	Fotos anschauen
280	0	Mit Puppen spielen
281	0	Bausteine spielen
282	0	mit Autos spielen
283	0	schaukeln
284	0	mit dem Hund spielen
285	0	mit der Katze spielen
286	0	mit der Eisenbahn spielen
287	0	Trampolin springen
288	0	Puzzle soielen
289	0	Karten alleine spielen
290	0	Patience legen
291	0	Sudoku
292	0	Kreuzworträtsel
293	0	Rollenspiele
294	0	Fangen spielen
295	0	Nachlaufen spielen
296	0	am Spielplatz spielen
297	0	im Schulhof spielen
298	0	Backgammon
299	0	Schnapsen
300	0	Poker
301	0	Darts
302	0	Bridge
303	0	Mensch-ärgere-dich-nicht
304	0	Billiards
305	0	Schach
306	0	Domino
307	0	Computerspiele
308	0	Play-Station spielen
309	0	Nintendo spielen
310	0	am Handy spielen
311	0	6-aus-45 Lotto
312	0	Lotto spielen
313	0	Wettspiele
314	0	Roulett
315	0	Spielautomat spielen
316	0	Pferdewetten
317	0	Spielen
318	0	Zeitung lesen
319	0	Zeitschirft lesen
320	0	Tagezeitung lesen
321	0	Magazine lesen
322	0	Comic lesen
323	0	Autozeitschrift lesen
324	0	Buch lesen
325	0	Roman lesen
326	0	Lexikon lesen
327	0	Katolog lesen
328	0	Bedienungsanleitung lesen
329	0	Atlas lesen
330	0	TV-Programm lesen
331	0	Lesen am Abend im Bett
332	0	Lesen
333	0	Fernsehen
334	0	TV schauen
335	0	DVD schauen
336	0	Video schauen
337	0	Recorder programmieren
338	0	Radio hören
339	0	Musik hören
340	0	Musik streamen
341	0	MP3 hören
342	0	CDs hören
343	0	Internet surfen
344	0	Online Zeitung lesen
345	0	Wikipedia lesen
\.


--
-- TOC entry 3522 (class 0 OID 16615)
-- Dependencies: 209
-- Data for Name: tdict_en; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tdict_en (id, var, entry) FROM stdin;
\.


--
-- TOC entry 3515 (class 0 OID 16573)
-- Dependencies: 202
-- Data for Name: tlog; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tlog (id, user_id, at, log) FROM stdin;
358	15	2019-07-24 15:20:03.43	User 'tus_test1' logged in successfully (version=dom 1022x1177)
651	15	2019-07-25 10:34:34.121	User 'tus_test1' logged in successfully (version=dom 360x567)
799	15	2019-07-25 11:04:06.156	User 'tus_test1' logged in successfully (version=dom 360x567)
800	15	2019-10-16 13:40:21.572	User 'tus_test1' logged in successfully (version=dom 1024x1177)
802	15	2019-10-16 13:54:06.646	User 'tus_test1' logged in successfully (version=dom 1024x1177)
803	15	2019-10-16 13:58:36.615	User 'tus_test1' logged in successfully (version=dom 373x1177)
808	15	2019-10-16 14:36:17.122	User 'tus_test1' logged in successfully (version=dom 1024x1177)
809	15	2019-10-16 14:36:23.088	User 'tus_test1' logged in successfully (version=dom 1024x1177)
810	15	2019-10-16 14:40:17.399	User 'tus_test1' logged in successfully (version=dom 1024x1177)
1107	15	2019-10-17 10:26:58.656	User 'tus_test1' logged in successfully (version=dom 373x1177)
1108	15	2019-10-17 10:27:05.733	User 'tus_test1' logged in successfully (version=dom 373x1177)
1256	15	2019-10-17 10:49:15.743	User 'tus_test1' logged in successfully (version=dom 373x1177)
1257	15	2019-10-17 11:01:20.475	User 'tus_test1' logged in successfully (version=dom 373x1177)
1432	15	2019-10-17 12:33:07.85	User 'tus_test1' updated sucessfully (version=dom 921x1084)
1433	15	2019-10-17 12:33:21.128	User 'tus_test1' logged in successfully (version=dom 373x1177)
1434	15	2019-10-17 12:42:33.762	User 'tus_test1' updated sucessfully (version=dom 373x1177)
1436	15	2019-10-17 12:43:00.356	User 'tus_test1' finished sucessfully (version=dom 373x1177)
1437	15	2019-10-17 12:55:36.215	User 'tus_test1' logged in successfully (version=dom 373x1177)
1443	15	2019-10-17 14:38:11.008	User 'tus_test1' logged in successfully (version=dom 373x1177)
1452	15	2019-10-17 14:55:48.877	User 'tus_test1' logged in successfully (version=dom 373x1177)
1453	15	2019-10-17 15:00:51.578	User 'tus_test1' logged in successfully (version=dom 373x1177)
1454	16	2019-10-17 15:01:10.979	User 'tus_test2' logged in successfully (version=dom 373x1177)
1455	15	2019-10-17 15:01:58.237	User 'tus_test1' logged in successfully (version=dom 373x1177)
1458	\N	2019-10-17 15:40:09.85	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1459	\N	2019-10-17 15:42:05.841	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1460	\N	2019-10-18 08:00:39.927	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1461	\N	2019-10-18 08:00:59.979	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1462	\N	2019-10-18 08:12:25.67	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1463	\N	2019-10-18 08:12:35.23	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1464	\N	2019-10-18 08:13:40.917	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1465	\N	2019-10-18 08:15:13.09	Login attempt with username 'tus_test2' failed (version=dom 373x1177)
1466	\N	2019-10-18 08:16:18.272	Login attempt with username 'tus_test2' failed (version=dom 373x1177)
1467	\N	2019-10-18 08:16:26.038	Login attempt with username 'tus_test2' failed (version=dom 373x1177)
1468	\N	2019-10-18 08:20:27.774	Login attempt with username 'tus_test2' failed (version=dom 373x1177)
1469	\N	2019-10-18 08:21:57.033	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1470	\N	2019-10-18 08:22:17.649	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1471	\N	2019-10-18 08:23:31.986	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1472	\N	2019-10-18 08:24:45.138	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1473	\N	2019-10-18 08:26:51.076	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1474	\N	2019-10-18 08:29:39.712	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1475	\N	2019-10-18 08:31:47.4	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1476	\N	2019-10-18 10:44:26.591	Login attempt with username 'tus_test1' failed (version=dom 373x1177)
1477	15	2019-10-18 10:44:41.196	User 'tus_test1' logged in successfully (version=dom 373x1177)
1478	\N	2019-10-18 10:45:00.147	Login attempt with username 'tus_test2' failed (version=dom 373x1177)
1479	\N	2019-10-18 10:45:08.445	Login attempt with username 'tus_test2' failed (version=dom 373x1177)
1480	15	2019-10-18 16:13:54.753	User 'tus_test1' logged in successfully (version=dom 284x1084)
1481	15	2019-10-18 16:43:11.744	User 'tus_test1' logged in successfully (version=dom 1024x1177)
1482	\N	2019-10-18 16:59:39.72	Login attempt with username 'est' failed (version=dom 1024x1177)
1483	15	2019-10-21 09:48:52.986	User 'tus_test1' logged in successfully (version=dom 517x1177)
1484	15	2019-10-21 10:28:35.551	User 'tus_test1' logged in successfully (version=dom 517x1177)
1485	15	2019-10-21 10:29:58.692	User 'tus_test1' logged in successfully (version=dom 517x1177)
1486	15	2019-10-21 10:32:28.372	User 'tus_test1' logged in successfully (version=dom 517x1177)
1487	15	2019-10-21 10:40:16.1	User 'tus_test1' logged in successfully (version=dom 1024x1177)
1488	\N	2019-10-21 10:51:47.355	Login attempt with username 'tus_client1' failed (version=dom 517x1177)
1489	15	2019-10-21 10:52:00.536	User 'tus_test1' logged in successfully (version=dom 517x1177)
1490	15	2019-10-21 11:03:09.678	User 'tus_test1' logged in successfully (version=dom 360x567)
1491	15	2019-10-21 11:35:01.831	User 'tus_test1' logged in successfully (version=dom 360x567)
1492	15	2019-10-21 11:38:39.678	User 'tus_test1' logged in successfully (version=dom 360x567)
1493	15	2019-10-21 12:47:10.059	User 'tus_test1' logged in successfully (version=dom 360x567)
1494	15	2019-10-21 12:53:21.203	User 'tus_test1' logged in successfully (version=dom 360x567)
1495	15	2019-10-21 13:07:04.406	User 'tus_test1' logged in successfully (version=dom 400x852)
1496	\N	2019-10-22 14:20:43.264	Login attempt with username 'tus_test' failed (version=dom 0x0)
1497	15	2019-10-22 14:21:39.812	User 'tus_test1' logged in successfully (version=dom 0x0)
1498	15	2019-11-04 11:08:07.241	User 'tus_test1' logged in successfully (version=dom 439x1177)
1499	15	2019-11-04 11:22:06.87	User 'tus_test1' logged in successfully (version=dom 439x1177)
1500	15	2019-11-04 11:27:02.367	User 'tus_test1' logged in successfully (version=dom 1024x1177)
1501	15	2019-11-04 11:45:15.014	User 'tus_test1' logged in successfully (version=dom 439x1177)
1502	15	2019-11-06 10:08:19.419	User 'tus_test1' logged in successfully (version=dom 439x1177)
1503	\N	2019-11-07 10:19:05.121	Login attempt with username 'tus_test1' failed (version=dom 360x567)
1504	15	2019-11-07 10:19:13.149	User 'tus_test1' logged in successfully (version=dom 360x567)
1505	\N	2019-11-07 10:20:45.939	Login attempt with username 'tus_test' failed (version=dom 360x567)
1506	15	2019-11-07 10:20:51.134	User 'tus_test1' logged in successfully (version=dom 360x567)
1507	\N	2019-11-08 09:56:06.282	Login attempt with username 'tus_client1' failed (version=dom 360x567)
1508	15	2019-11-08 09:56:20.966	User 'tus_test1' logged in successfully (version=dom 360x567)
1509	15	2019-11-08 10:22:10.743	User 'tus_test1' logged in successfully (version=dom 1024x1177)
1510	15	2019-11-11 10:22:13.701	User 'tus_test1' logged in successfully (version=dom 619x1177)
1511	15	2019-11-11 10:23:16.439	User 'tus_test1' logged in successfully (version=dom 619x1177)
1512	15	2019-11-11 10:26:14.008	User 'tus_test1' logged in successfully (version=dom 619x1177)
1513	15	2019-11-11 10:27:49.382	User 'tus_test1' logged in successfully (version=dom 360x567)
1514	15	2019-11-11 10:28:39.661	User 'tus_test1' logged in successfully (version=dom 360x567)
1515	15	2019-11-11 10:32:12.546	User 'tus_test1' logged in successfully (version=dom 360x567)
1516	15	2019-11-11 10:34:34.337	User 'tus_test1' logged in successfully (version=dom 360x567)
1517	15	2019-11-11 10:48:28.74	User 'tus_test1' logged in successfully (version=dom 360x567)
1518	15	2019-11-11 10:49:52.372	User 'tus_test1' logged in successfully (version=dom 360x567)
1519	15	2019-11-11 10:50:54.916	User 'tus_test1' logged in successfully (version=dom 401x1177)
1520	15	2019-11-11 10:52:59.04	User 'tus_test1' logged in successfully (version=dom 401x1177)
1521	15	2019-11-11 10:53:11.239	User 'tus_test1' logged in successfully (version=dom 401x1177)
1522	15	2019-11-11 10:56:43.643	User 'tus_test1' logged in successfully (version=dom 401x1177)
1523	15	2019-11-11 11:00:12.476	User 'tus_test1' logged in successfully (version=dom 401x1177)
1524	15	2019-11-18 09:19:33.571	User 'tus_test1' logged in successfully (version=dom 360x568)
1525	15	2019-11-18 09:22:18.086	User 'tus_test1' logged in successfully (version=dom 360x567)
1526	15	2019-11-18 09:26:53.414	User 'tus_test1' logged in successfully (version=dom 375x751)
1527	15	2019-11-18 09:32:07.708	User 'tus_test1' logged in successfully (version=dom 360x567)
1528	15	2019-11-18 09:41:44.959	User 'tus_test1' logged in successfully (version=dom 360x567)
1529	15	2019-12-02 14:50:34.592	User 'tus_test1' logged in successfully (version=dom 1858x1097)
1530	15	2019-12-02 14:50:55.441	User 'tus_test1' logged in successfully (version=dom 1024x1206)
1531	15	2019-12-03 11:10:31.417	User 'tus_test1' logged in successfully (version=dom 526x1177)
1532	\N	2020-06-18 14:24:13.501	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1533	\N	2020-06-18 14:24:31.59	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1534	\N	2020-06-18 14:25:09.204	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1549	\N	2020-06-18 14:38:03.678	Login attempt with username 'tus_test3' failed (version=dom 320x568)
1550	\N	2020-06-18 14:38:52.207	Login attempt with username 'tus_test3' failed (version=dom 320x568)
1551	\N	2020-06-18 14:43:55.89	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1552	\N	2020-06-18 14:59:16.84	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1553	\N	2020-06-18 14:59:58.403	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1554	\N	2020-06-18 15:00:26.326	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1555	\N	2020-06-18 15:01:14.191	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1556	18	2020-06-18 15:13:42.302	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1557	18	2020-06-18 15:13:45.592	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1558	18	2020-06-18 15:14:21.959	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1559	18	2020-06-18 15:15:24.091	Login attempt with username 'tus_test3' failed (version=dom 320x568)
1560	18	2020-06-18 15:15:35.357	Login attempt with username 'tus_test3' failed (version=dom 320x568)
1561	18	2020-06-18 15:15:43.27	Login attempt with username 'tus_test3' failed (version=dom 320x568)
1562	18	2020-06-18 15:16:14.219	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1564	1544	2020-06-18 15:25:22.923	User 'tus_test3' logged in successfully (version=dom 320x568)
1685	18	2020-06-18 16:15:16.044	Login attempt with username 'tus_test5' failed (version=dom 320x568)
1686	1544	2020-06-18 16:15:24.775	User 'tus_test3' logged in successfully (version=dom 320x568)
1687	18	2020-06-18 16:15:38.805	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1688	18	2020-06-18 16:15:47.92	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1689	18	2020-06-18 16:15:53.538	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1690	18	2020-06-18 16:16:00.02	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1691	18	2020-06-18 16:16:05.153	Login attempt with username 'tus_test2' failed (version=dom 320x568)
1692	1544	2020-06-18 16:16:11.219	User 'tus_test3' logged in successfully (version=dom 320x568)
1699	18	2020-06-18 16:17:01.24	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1700	18	2020-06-18 16:17:08.171	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1701	18	2020-06-18 16:17:53.84	Login attempt with username 'tus_test2' failed (version=dom 320x568)
1702	1544	2020-06-18 16:18:04.622	User 'tus_test3' logged in successfully (version=dom 320x568)
1703	18	2020-06-18 16:30:04.036	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1704	18	2020-06-18 16:30:08.288	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1705	18	2020-06-18 16:31:01.998	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1706	18	2020-06-18 16:31:17.627	Login attempt with username 'tus_test' failed (version=dom 320x568)
1707	18	2020-06-18 16:31:37.981	Login attempt with username 'tus_test4' failed (version=dom 320x568)
1708	18	2020-06-18 16:31:49.392	Login attempt with username 'tus_test4' failed (version=dom 320x568)
1709	1583	2020-06-18 16:33:12.418	User 'tus_test4' logged in successfully (version=dom 320x568)
1710	18	2020-06-19 08:57:33.938	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1711	1544	2020-06-19 08:58:05.901	User 'tus_test3' logged in successfully (version=dom 320x568)
1712	18	2020-06-19 11:38:46.763	Login attempt with username 'tus_test1' failed (version=dom 320x568)
1713	18	2020-06-22 14:51:49.275	Login attempt with username 'tus_test1' failed (version=dom 1022x1177)
1714	18	2020-06-22 14:52:01.038	Login attempt with username 'tus_test1' failed (version=dom 0x0)
1715	1544	2020-06-22 14:56:54.644	User 'tus_test3' logged in successfully (version=dom 0x0)
1721	18	2020-06-22 15:01:57.85	Login attempt with username 'tus_test1' failed (version=dom 320x568)
\.


--
-- TOC entry 3516 (class 0 OID 16578)
-- Dependencies: 203
-- Data for Name: tquest; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tquest (id, user_id, quest_no, created, updated, finished) FROM stdin;
1287	15	1	2019-10-17 12:33:07.85	2019-10-17 12:43:00.356	f
\.


--
-- TOC entry 3517 (class 0 OID 16583)
-- Dependencies: 204
-- Data for Name: tslot; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tslot (id, quest_id, start, ende, updated, ort, primary_activity, secondary_activity, allein, partner, kind, mitglied, andere, day) FROM stdin;
1350	1287	2019-07-19 10:00:00	2019-07-19 10:09:00	2019-10-17 12:42:31.977	3	fischen	Schlafen	f	f	f	t	f	\N
1351	1287	2019-07-19 10:10:00	2019-07-19 10:19:00	2019-10-17 12:42:44.257	8	eislaufen	umziehen	f	f	f	f	t	\N
\.


--
-- TOC entry 3518 (class 0 OID 16591)
-- Dependencies: 205
-- Data for Name: tuser; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tuser (id, username, password, day, first_login, last_login, day2) FROM stdin;
1544	tus_test3	cc6a5dbfc84708d99a2338c98efbfdfffcd9ce3cb2f3f87219443e1095405149	2020-06-18	2020-06-18 14:37:01.540205	2020-06-22 14:56:54.644	2020-06-18
16	tus_test2	36d00e9037667f668128b2ed42e8a894b3bad01371934bb71db3af1e4afeae29	2019-10-16	2019-10-16 14:32:36.06	2019-10-17 15:01:10.979	2019-10-17
15	tus_test1	36d00e9037667f668128b2ed42e8a894b3bad01371934bb71db3af1e4afeae29	2019-07-19	2019-12-31 00:00:00	2019-12-03 11:10:31.417	2019-07-20
18	FAILED_LOGIN	NONSENSE	2999-12-31	2999-12-31 00:00:00	2999-12-31 00:00:00	2020-06-18
19	q	invalid	2017-08-11	2999-12-31 00:00:00	2017-08-17 12:53:26.486	2020-06-18
2405	r	invalid	2017-08-14	2999-12-31 00:00:00	2017-08-17 12:52:22.508	2020-06-18
2415	s	invalid	2017-08-17	2999-12-31 00:00:00	2017-08-17 11:52:28.28	2020-06-18
1594	tus_test5	75a4591ce178decd1014021449283d41ccdf77b19b44d615809cd4f2d1016df7	0119-02-01	1099-11-02 00:00:00	1099-11-02 00:00:00	2020-06-18
1602	tustestcbs1	0e3dc2298af6759ab20e6d34f5966a36d6f10dacc4c8808da76399d3dd56860d	2020-11-01	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1608	tustestcbs2	fefc4a853a87be46a38044c690d166bbac8475ad2bcbf13c5ac6c40760de6c7a	2020-11-02	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1614	tustestcbs3	8a105f1ff1219978fcf43b18988b1476a3c7b1aaee0a2834b12ad2793eb51273	2020-12-03	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1620	tustestcbs4	21bf492ac62712dbaf64d3efca053ffb1d1d48cb557a4ebf69327af6d17ad18f	2020-12-04	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1626	tustestcbs5	15b3d257619985b6c1fac978cd4473ff8645aaa7792f3a7dadb48fe70b01395b	2020-12-05	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1632	tustestcbs6	11e9f194c9123c2ed5f2cb690b7f742590cc91639e8f14da95d289e79e6d380b	2020-12-06	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1638	tustestcbs7	cc776b45ab051728896a07c1ee6f8314b01053af6f014c3d1a9dfd5bb0d5b214	2020-12-07	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1644	tustestcbs8	02e5dc6aeca622092b8097864fbe1a0deb7ce1e89daf5ab0b04e554f23369287	2020-12-01	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1650	tustestcbs9	ba67a8a3d42ba3a9da2dddb038eaa438c2f9b88968e6013ef7928c4aa3d16c58	2020-12-02	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1656	tustestcbs10	45263689b7436d26f2b30eb7e2d779a1ceb3eb086252e7724e9fa7a47315d10c	2020-12-03	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1662	userlabcbs@gmail.com1!	64f733e69783929eaae7026315b0cab41ae1a9bdfbb5927c51d8dd2f97883269	2020-12-04	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1668	eniel.ninka@gmail.com1!	c13096bd2a29204a573eb6242686aedf372ab3b40207f51f1dc862a0690518eb	2020-12-05	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1674	msbiggie16@gmail.com1!	279fbb281faa0e5002f8b328a96338c9019bb4f77f43688f68ca852d22cdcb10	2020-12-06	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1680	elke.nagel@posteo.de1!	3dd8ffa9c808bad9102869d4d32a1679224dfd42566e3ab44e82a51362e56c24	2020-12-07	2999-12-03 00:00:00	2999-12-03 00:00:00	2020-06-18
1583	tus_test4	69d71775593ff26b889390c5bc3ef30721e858789f34ada877954686b2481d23	0119-02-01	1099-11-02 00:00:00	2020-06-18 16:33:12.418	2020-06-18
\.


--
-- TOC entry 3519 (class 0 OID 16596)
-- Dependencies: 206
-- Data for Name: tuser_info; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tuser_info (id, user_id, name, wert) FROM stdin;
\.


--
-- TOC entry 3513 (class 0 OID 16563)
-- Dependencies: 200
-- Data for Name: tuser_wb; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.tuser_wb (id, user_id, wb, later) FROM stdin;
16	15	1200	1
17	15	1800	0
18	15	2300	0
19	15	600	0
20	16	0	0
1545	1544	1200	1
1546	1544	1800	0
1547	1544	2300	0
1548	1544	600	0
1589	1583	1200	1
1590	1583	1800	0
1591	1583	2300	0
1592	1583	600	0
1595	1594	1200	1
1596	1594	1800	0
1597	1594	2300	0
1598	1594	600	0
1603	1602	1200	1
1604	1602	1800	0
1605	1602	2300	0
1606	1602	600	0
1609	1608	1200	1
1610	1608	1800	0
1611	1608	2300	0
1612	1608	600	0
1615	1614	1200	1
1616	1614	1800	0
1617	1614	2300	0
1618	1614	600	0
1621	1620	1200	1
1622	1620	1800	0
1623	1620	2300	0
1624	1620	600	0
1627	1626	1200	1
1628	1626	1800	0
1629	1626	2300	0
1630	1626	600	0
1633	1632	1200	1
1634	1632	1800	0
1635	1632	2300	0
1636	1632	600	0
1639	1638	1200	1
1640	1638	1800	0
1641	1638	2300	0
1642	1638	600	0
1645	1644	1200	1
1646	1644	1800	0
1647	1644	2300	0
1648	1644	600	0
1651	1650	1200	1
1652	1650	1800	0
1653	1650	2300	0
1654	1650	600	0
1657	1656	1200	1
1658	1656	1800	0
1659	1656	2300	0
1660	1656	600	0
1663	1662	1200	1
1664	1662	1800	0
1665	1662	2300	0
1666	1662	600	0
1669	1668	1200	1
1670	1668	1800	0
1671	1668	2300	0
1672	1668	600	0
1675	1674	1200	1
1676	1674	1800	0
1677	1674	2300	0
1678	1674	600	0
1681	1680	1200	1
1682	1680	1800	0
1683	1680	2300	0
1684	1680	600	0
\.


--
-- TOC entry 3520 (class 0 OID 16601)
-- Dependencies: 207
-- Data for Name: twb; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.twb (id, quest_id, at, updated, lucky_question, relaxed_question, like_question, later_question) FROM stdin;
1435	1287	2019-07-19 12:00:00	2019-10-17 12:43:00.095	2	3	5	t
\.


--
-- TOC entry 3526 (class 0 OID 24594)
-- Dependencies: 213
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: tusadmin
--

COPY public.user_role (id, user_id, role_id) FROM stdin;
1	1	1
2	1	2
3	2	2
\.


--
-- TOC entry 3549 (class 0 OID 0)
-- Dependencies: 208
-- Name: key_seq; Type: SEQUENCE SET; Schema: public; Owner: tusadmin
--

SELECT pg_catalog.setval('public.key_seq', 1721, true);


--
-- TOC entry 3377 (class 2606 OID 24591)
-- Name: app_role app_role_pk; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.app_role
    ADD CONSTRAINT app_role_pk PRIMARY KEY (role_id);


--
-- TOC entry 3379 (class 2606 OID 24593)
-- Name: app_role app_role_uk; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.app_role
    ADD CONSTRAINT app_role_uk UNIQUE (role_name);


--
-- TOC entry 3373 (class 2606 OID 24584)
-- Name: app_user app_user_pk; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pk PRIMARY KEY (user_id);


--
-- TOC entry 3375 (class 2606 OID 24586)
-- Name: app_user app_user_uk; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_uk UNIQUE (user_name);


--
-- TOC entry 3385 (class 2606 OID 24615)
-- Name: persistent_logins persistent_logins_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.persistent_logins
    ADD CONSTRAINT persistent_logins_pkey PRIMARY KEY (series);


--
-- TOC entry 3355 (class 2606 OID 16572)
-- Name: tdict tdict_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tdict
    ADD CONSTRAINT tdict_pkey PRIMARY KEY (id);


--
-- TOC entry 3371 (class 2606 OID 16627)
-- Name: tdict_de tdict_pkey_de; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tdict_de
    ADD CONSTRAINT tdict_pkey_de PRIMARY KEY (id);


--
-- TOC entry 3369 (class 2606 OID 16619)
-- Name: tdict_en tdict_pkey_en; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tdict_en
    ADD CONSTRAINT tdict_pkey_en PRIMARY KEY (id);


--
-- TOC entry 3357 (class 2606 OID 16577)
-- Name: tlog tlog_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tlog
    ADD CONSTRAINT tlog_pkey PRIMARY KEY (id);


--
-- TOC entry 3359 (class 2606 OID 16582)
-- Name: tquest tquest_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tquest
    ADD CONSTRAINT tquest_pkey PRIMARY KEY (id);


--
-- TOC entry 3361 (class 2606 OID 16590)
-- Name: tslot tslot_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tslot
    ADD CONSTRAINT tslot_pkey PRIMARY KEY (id);


--
-- TOC entry 3365 (class 2606 OID 16600)
-- Name: tuser_info tuser_info_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tuser_info
    ADD CONSTRAINT tuser_info_pkey PRIMARY KEY (id);


--
-- TOC entry 3363 (class 2606 OID 16595)
-- Name: tuser tuser_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tuser
    ADD CONSTRAINT tuser_pkey PRIMARY KEY (id);


--
-- TOC entry 3353 (class 2606 OID 16567)
-- Name: tuser_wb tuser_wb_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.tuser_wb
    ADD CONSTRAINT tuser_wb_pkey PRIMARY KEY (id);


--
-- TOC entry 3367 (class 2606 OID 16605)
-- Name: twb twb_pkey; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.twb
    ADD CONSTRAINT twb_pkey PRIMARY KEY (id);


--
-- TOC entry 3381 (class 2606 OID 24598)
-- Name: user_role user_role_pk; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pk PRIMARY KEY (id);


--
-- TOC entry 3383 (class 2606 OID 24600)
-- Name: user_role user_role_uk; Type: CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_uk UNIQUE (user_id, role_id);


--
-- TOC entry 3386 (class 2606 OID 24601)
-- Name: user_role user_role_fk1; Type: FK CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_fk1 FOREIGN KEY (user_id) REFERENCES public.app_user(user_id);


--
-- TOC entry 3387 (class 2606 OID 24606)
-- Name: user_role user_role_fk2; Type: FK CONSTRAINT; Schema: public; Owner: tusadmin
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_fk2 FOREIGN KEY (role_id) REFERENCES public.app_role(role_id);


--
-- TOC entry 3534 (class 0 OID 0)
-- Dependencies: 208
-- Name: SEQUENCE key_seq; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT ALL ON SEQUENCE public.key_seq TO tusapp;


--
-- TOC entry 3535 (class 0 OID 0)
-- Dependencies: 196
-- Name: TABLE tauthgroup; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tauthgroup TO tusapp;


--
-- TOC entry 3536 (class 0 OID 0)
-- Dependencies: 197
-- Name: TABLE tauthprofattr; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tauthprofattr TO tusapp;


--
-- TOC entry 3537 (class 0 OID 0)
-- Dependencies: 198
-- Name: TABLE tauthuser; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tauthuser TO tusapp;


--
-- TOC entry 3538 (class 0 OID 0)
-- Dependencies: 199
-- Name: TABLE tauthuser2group; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tauthuser2group TO tusapp;


--
-- TOC entry 3539 (class 0 OID 0)
-- Dependencies: 201
-- Name: TABLE tdict; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tdict TO tusapp;


--
-- TOC entry 3540 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE tdict_de; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tdict_de TO tusapp;


--
-- TOC entry 3541 (class 0 OID 0)
-- Dependencies: 209
-- Name: TABLE tdict_en; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tdict_en TO tusapp;


--
-- TOC entry 3542 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE tlog; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tlog TO tusapp;


--
-- TOC entry 3543 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE tquest; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tquest TO tusapp;


--
-- TOC entry 3544 (class 0 OID 0)
-- Dependencies: 204
-- Name: TABLE tslot; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tslot TO tusapp;


--
-- TOC entry 3545 (class 0 OID 0)
-- Dependencies: 205
-- Name: TABLE tuser; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tuser TO tusapp;


--
-- TOC entry 3546 (class 0 OID 0)
-- Dependencies: 206
-- Name: TABLE tuser_info; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tuser_info TO tusapp;


--
-- TOC entry 3547 (class 0 OID 0)
-- Dependencies: 200
-- Name: TABLE tuser_wb; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tuser_wb TO tusapp;


--
-- TOC entry 3548 (class 0 OID 0)
-- Dependencies: 207
-- Name: TABLE twb; Type: ACL; Schema: public; Owner: tusadmin
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.twb TO tusapp;


-- Completed on 2020-07-01 14:12:12

--
-- PostgreSQL database dump complete
--

